// Constants
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const MIN_MIDI = 36; // C2
const MAX_MIDI = 84; // C6
const BLACK_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]); // semitone indices within octave
const sampleMidis = SAMPLES.map(function (sample) { return sample.midi; });

// Page elements
const playButton = document.getElementById('playBtn');
const submitButton = document.getElementById('submitBtn');
const nextButton = document.getElementById('nextBtn');
const backButton = document.getElementById('backBtn');
const feedback = document.getElementById('feedback');
const keyboard = document.getElementById('keyboard');
const presetScreen = document.getElementById('presetScreen');
const gameArea = document.getElementById('gameArea');
const difficultyButtons = document.querySelectorAll('.diff-btn');
const settingControls = {
    hearGuess: document.getElementById('hearGuessToggle'),
    autoSelectLowest: document.getElementById('autoLowestToggle'),
    smallGaps: document.getElementById('smallGapsToggle'),
    doublings: document.getElementById('doublingsToggle'),
    chordsOnly: document.getElementById('chordsOnlyToggle'),
    inversions: document.getElementById('inversionsToggle'),
};
const volumeHint = document.getElementById('volumeHint');
const settingsPanel = document.getElementById('settingsPanel');

// State
let audioContext = null;
let masterGain = null;
let answerNotes = [];        // MIDI numbers (the answer)
let selectedNotes = new Set(); // MIDI numbers the user picked
let phase = 'presets'; // presets, guessing, results
let activeSources = [];

/* Sample buffers: midi → AudioBuffer */
let sampleBuffers = {};
let samplesLoaded = false;
let samplesLoading = false;

const settings = {
    difficulty: 3,
    hearGuess: true,
    autoSelectLowest: true,
    doublings: false,
    chordsOnly: true,
    inversions: false,
    smallGaps: true,
};
let savedChordSettings = null;

/* Hide auto-selected note until the user presses Play for the first time.
   Reset to true whenever settings or difficulty change. */
let needsFirstPlay = true;

// Game flow
function startRound() {
    answerNotes = generateNotes();
    selectedNotes.clear();
    // Settings can regenerate notes while the preset screen is still open.
    if (phase !== 'presets') phase = 'guessing';

    /* Auto-select the lowest note — but only if we've already
       pressed Play at least once (not in a "cold start" state). */
    if (!needsFirstPlay && settings.autoSelectLowest && answerNotes.length > 0) {
        selectedNotes.add(answerNotes[0]);
    }

    submitButton.style.display = '';
    submitButton.disabled = false;
    nextButton.style.display = 'none';
    feedback.textContent = '';
    feedback.style.color = '';
    feedback.classList.remove('visible');

    updateKeyboard();
}

function submitGuess() {
    if (phase !== 'guessing') return;
    phase = 'results';

    stopPlayback();

    /* Build per-note feedback: ✓ for correct, ✗ for missed/extra */
    var correctSet = new Set(answerNotes);
    var isExactMatch = selectedNotes.size === answerNotes.length &&
        answerNotes.every(function (midi) { return selectedNotes.has(midi); });

    feedback.innerHTML = '';

    if (isExactMatch) {
        feedback.textContent = '\u2714 Correct';
        feedback.style.color = '#2e7d32';
    } else {
        /* Show each answer note with ✓ or ✗ */
        var parts = answerNotes.map(function (midi) {
            var name = midiToName(midi);
            if (selectedNotes.has(midi)) {
                return '<span style="color:#2e7d32">\u2714\u2009' + name + '</span>';
            } else {
                return '<span style="color:#c62828">\u2718\u2009' + name + '</span>';
            }
        });
        /* Append any extra notes the user selected that aren't in the answer */
        var extras = [];
        selectedNotes.forEach(function (midi) {
            if (!correctSet.has(midi)) extras.push(midi);
        });
        extras.sort(function (a, b) { return a - b; });
        extras.forEach(function (midi) {
            parts.push('<span style="color:#c62828">\u2718\u2009' + midiToName(midi) + '</span>');
        });
        feedback.innerHTML = parts.join('\u2002');
    }

    feedback.classList.add('visible');

    submitButton.style.display = 'none';
    nextButton.style.display = '';
    nextButton.focus();

    updateKeyboard();
}

async function nextRound() {
    startRound();
    if (audioContext) {
        await playChord();
    }
}

function updateSettingsControls() {
    difficultyButtons.forEach((button) => {
        button.classList.toggle('active', Number(button.dataset.val) === settings.difficulty);
    });
    for (const [name, checkbox] of Object.entries(settingControls)) {
        checkbox.checked = settings[name];
    }
    settingControls.chordsOnly.disabled = settings.difficulty >= 6;
    settingControls.inversions.disabled = settings.difficulty >= 6;
}

function restartRound() {
    stopPlayback();
    needsFirstPlay = true;
    startRound();
}

function setDifficulty(difficulty) {
    if (difficulty >= 6 && settings.difficulty < 6) {
        savedChordSettings = { chordsOnly: settings.chordsOnly, inversions: settings.inversions };
        settings.chordsOnly = false;
        settings.inversions = false;
    } else if (difficulty < 6 && savedChordSettings) {
        Object.assign(settings, savedChordSettings);
        savedChordSettings = null;
    }
    settings.difficulty = difficulty;
    updateSettingsControls();
    restartRound();
}

function applyPreset(index) {
    Object.assign(settings, PRESETS[index]);
    savedChordSettings = null;
    updateSettingsControls();
    presetScreen.hidden = true;
    gameArea.hidden = false;
    phase = 'guessing';
    restartRound();
}

function showPresets() {
    stopPlayback();
    phase = 'presets';
    selectedNotes.clear();
    gameArea.hidden = true;
    presetScreen.hidden = false;
}

async function playChord() {
    if (needsFirstPlay) {
        needsFirstPlay = false;
        /* Do the deferred auto-select now that the user has heard the chord */
        if (settings.autoSelectLowest && answerNotes.length > 0) {
            selectedNotes.add(answerNotes[0]);
            updateKeyboard();
        }
    }
    await playNotes(answerNotes);
}

// Helpers
function isBlack(midi) {
    return BLACK_PITCH_CLASSES.has(midi % 12);
}

function midiToName(midi) {
    return NOTE_NAMES[midi % 12] + (Math.floor(midi / 12) - 1);
}

/* ======================================================
   Audio – Salamander piano sample playback
   Loads real piano samples and pitch-shifts to the
   target note via AudioBufferSourceNode.playbackRate.
   ====================================================== */
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.75;
    masterGain.connect(audioContext.destination);

    /* Safari unlock: send a silent buffer synchronously inside the
       user gesture so the context isn't left muted while loadSamples()
       awaits the network. */
    var silent = audioContext.createBufferSource();
    silent.buffer = audioContext.createBuffer(1, 1, 22050);
    silent.connect(audioContext.destination);
    silent.start(0);
}

/**
 * Fetch and decode all piano samples into AudioBuffers.
 * Called lazily on first playback so the AudioContext exists.
 */
async function loadSamples() {
    if (samplesLoaded || samplesLoading) return;
    samplesLoading = true;

    /* Safari-safe decodeAudioData: older Safari only supports the callback
       form, so always pass callbacks and wrap in a Promise ourselves. */
    function decode(encodedAudio) {
        return new Promise(function (resolve, reject) {
            audioContext.decodeAudioData(encodedAudio, resolve, reject);
        });
    }

    var promises = SAMPLES.map(function (sample) {
        return fetch(SAMPLE_PATH + sample.name + '.mp3')
            .then(function (response) { return response.arrayBuffer(); })
            .then(decode)
            .then(function (decoded) { sampleBuffers[sample.midi] = decoded; })
            .catch(function (error) {
                console.warn('Failed to load sample ' + sample.name + ':', error);
            });
    });

    await Promise.all(promises);
    samplesLoaded = true;
    samplesLoading = false;
}

/**
 * Find the MIDI number of the nearest loaded sample
 * to the given target MIDI note.
 */
function findNearestSample(midi) {
    var nearestMidi = null;
    var nearestDistance = Infinity;
    for (var i = 0; i < sampleMidis.length; i++) {
        var sampleMidi = sampleMidis[i];
        if (sampleBuffers[sampleMidi] === undefined) continue; // skip failed loads
        var distance = Math.abs(midi - sampleMidi);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestMidi = sampleMidi;
        }
    }
    return nearestMidi;
}

function stopPlayback() {
    activeSources.forEach(function (audioSource) {
        try { audioSource.stop(); } catch (_) {}
    });
    activeSources = [];
}

/**
 * Play an array of MIDI notes simultaneously using piano samples.
 * Each note finds the nearest sample and pitch-shifts via playbackRate.
 */
async function playNotes(notes) {
    if (!notes.length) { stopPlayback(); return; }
    /* initAudio() must run synchronously inside the user gesture for Safari. */
    if (!audioContext) initAudio();
    if (audioContext.state === 'suspended') await audioContext.resume();
    if (!samplesLoaded) await loadSamples();
    stopPlayback();

    var now = audioContext.currentTime;
    /* Scale per-note volume so chords don't clip */
    var noteVolume = 0.55 / Math.sqrt(notes.length);

    notes.forEach(function (midi) {
        var sampleMidi = findNearestSample(midi);
        if (sampleMidi === null) return;

        var rate = Math.pow(2, (midi - sampleMidi) / 12);

        var audioSource = audioContext.createBufferSource();
        audioSource.buffer = sampleBuffers[sampleMidi];
        audioSource.playbackRate.value = rate;

        var noteGain = audioContext.createGain();
        noteGain.gain.value = noteVolume / Math.sqrt(rate);

        audioSource.connect(noteGain);
        noteGain.connect(masterGain);

        audioSource.start(now);
        activeSources.push(audioSource);
    });
}

// Note generation helpers

/**
 * Check whether an interval set contains duplicate pitch classes.
 */
function hasDoublings(intervals) {
    var pitchClasses = new Set();
    for (var i = 0; i < intervals.length; i++) {
        var pitchClass = ((intervals[i] % 12) + 12) % 12;
        if (pitchClasses.has(pitchClass)) return true;
        pitchClasses.add(pitchClass);
    }
    return false;
}

/**
 * Fisher-Yates shuffle of the entire array (returns a new array).
 */
function shuffleArray(values) {
    var shuffled = values.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var previousValue = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = previousValue;
    }
    return shuffled;
}

/**
 * Shuffle all elements except the first (returns a new array).
 */
function shuffleKeepFirst(values) {
    var shuffled = values.slice();
    for (var i = shuffled.length - 1; i >= 2; i--) {
        var j = 1 + Math.floor(Math.random() * i);
        var previousValue = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = previousValue;
    }
    return shuffled;
}

/**
 * Given an ordered list of chord-interval values (which may be > 11,
 * e.g. 14 for a 9th), build a voicing by stacking each note as the
 * nearest pitch-class match above the previous note.
 * Returns intervals from the bass, e.g. [0, 3, 8].
 */
function buildVoicing(permutedIntervals) {
    var result = [0];
    for (var i = 1; i < permutedIntervals.length; i++) {
        var previousPitchClass = permutedIntervals[i - 1] % 12;
        var pitchClass = permutedIntervals[i] % 12;
        var gap = (pitchClass - previousPitchClass + 12) % 12;
        if (gap === 0) gap = 12;  // same pitch class → octave
        result.push(result[i - 1] + gap);
    }
    return result;
}

/**
 * Pick a uniform random translation t so that t + intervals fits
 * within [MIN_MIDI, MAX_MIDI].  Returns the final note array,
 * or null if no valid translation exists.
 */
function uniformTranslate(intervals) {
    var span = intervals[intervals.length - 1];
    var lowestBass = MIN_MIDI;
    var highestBass = MAX_MIDI - span;
    if (highestBass < lowestBass) return null;
    var bassMidi = lowestBass + Math.floor(Math.random() * (highestBass - lowestBass + 1));
    return intervals.map(function (interval) { return bassMidi + interval; });
}

// Note generation – main entry
function generateNotes() {
    if (settings.chordsOnly && settings.difficulty <= 5) {
        return generateChordNotes();
    }
    return generateNotesRandom();
}

/* ======================================================
   Chord-based generation
   Small gaps ON  → compact permutation voicing + uniform translate.
   Small gaps OFF → each note placed at a random octave in range.
   ====================================================== */
function generateChordNotes() {
    var chordList = CHORDS[settings.difficulty];
    if (!chordList || chordList.length === 0) {
        throw new Error('No chords defined for difficulty ' + settings.difficulty + '.');
    }

    var maxAttempts = 300;
    for (var attempt = 0; attempt < maxAttempts; attempt++) {
        /* Pick a random chord */
        var chord = chordList[Math.floor(Math.random() * chordList.length)];
        var chordIntervals = chord.intervals;

        /* Skip if doublings not allowed and chord has duplicate pitch classes */
        if (!settings.doublings && hasDoublings(chordIntervals)) continue;

        if (settings.smallGaps) {
            /* ── Compact voicing: permute, stack, translate ── */
            var permuted = settings.inversions ? shuffleArray(chordIntervals) : shuffleKeepFirst(chordIntervals);
            var intervals = buildVoicing(permuted);

            /* Safety check (should always pass for distinct PCs) */
            var gapsFit = true;
            for (var i = 1; i < intervals.length; i++) {
                if (intervals[i] - intervals[i - 1] > 12) { gapsFit = false; break; }
            }
            if (!gapsFit) continue;

            var notes = uniformTranslate(intervals);
            if (notes) return notes;
        } else {
            /* ── Wide voicing: each note at a random octave ── */
            var rootPitchClass = Math.floor(Math.random() * 12);
            var pitchClasses = chordIntervals.map(function (interval) { return (rootPitchClass + (interval % 12)) % 12; });

            var notes = [];
            var valid = true;
            for (var i = 0; i < pitchClasses.length; i++) {
                var pitchClass = pitchClasses[i];
                var candidates = [];
                for (var midi = MIN_MIDI; midi <= MAX_MIDI; midi++) {
                    if (midi % 12 === pitchClass && notes.indexOf(midi) === -1) {
                        candidates.push(midi);
                    }
                }
                if (candidates.length === 0) { valid = false; break; }
                notes.push(candidates[Math.floor(Math.random() * candidates.length)]);
            }
            if (!valid) continue;

            notes.sort(function (x, y) { return x - y; });

            /* If inversions off, the root pitch class must be the lowest note */
            if (!settings.inversions && notes[0] % 12 !== rootPitchClass) continue;

            return notes;
        }
    }

    throw new Error('Could not generate chord notes satisfying the current constraints.');
}

/* ======================================================
   Random (non-chord) generation
   Sample random MIDI notes, optionally reduce gaps and
   uniformly translate.
   ====================================================== */
function generateNotesRandom() {
    var maxAttempts = 300;
    for (var attempt = 0; attempt < maxAttempts; attempt++) {
        /* Pick random MIDI notes from the range. */
        var notes = [];
        var seen = new Set();
        var usedPitchClasses = new Set();
        var tries = 0;
        while (notes.length < settings.difficulty && tries < 500) {
            tries++;
            var midi = MIN_MIDI + Math.floor(Math.random() * (MAX_MIDI - MIN_MIDI + 1));
            if (seen.has(midi)) continue;
            if (!settings.doublings && usedPitchClasses.has(midi % 12)) continue;
            notes.push(midi);
            seen.add(midi);
            usedPitchClasses.add(midi % 12);
        }
        if (notes.length < settings.difficulty) continue;

        notes.sort(function (x, y) { return x - y; });

        /* If small gaps, reduce consecutive intervals > 12
           then uniformly translate into range */
        if (settings.smallGaps) {
            var reduced = false;
            for (var i = 1; i < notes.length; i++) {
                var gap = notes[i] - notes[i - 1];
                if (gap > 12) {
                    var newGap = gap % 12;
                    if (newGap === 0) newGap = 12;
                    notes[i] = notes[i - 1] + newGap;
                    reduced = true;
                }
            }

            if (reduced) {
                /* Extract shape and translate */
                var bass = notes[0];
                var intervals = notes.map(function (midi) { return midi - bass; });
                var result = uniformTranslate(intervals);
                if (!result) continue;   // doesn't fit → resample
                return result;
            }
        }

        /* No reduction needed (or small gaps off) → return as-is */
        return notes;
    }

    throw new Error('Could not generate random notes satisfying the current constraints.');
}

// Keyboard rendering
function buildKeyboard() {
    const style = getComputedStyle(keyboard);
    const whiteWidth = parseFloat(style.getPropertyValue('--white-key-width'));
    const blackWidth = parseFloat(style.getPropertyValue('--black-key-width'));
    let whiteIndex = 0;
    keyboard.replaceChildren();

    for (let midi = MIN_MIDI; midi <= MAX_MIDI; midi++) {
        const black = isBlack(midi);
        const key = document.createElement('div');
        key.className = black ? 'piano-key black-key' : 'piano-key white-key';
        key.dataset.midi = midi;
        key.style.left = (whiteIndex * whiteWidth - (black ? blackWidth / 2 : 0)) + 'px';

        const circle = document.createElement('div');
        circle.className = 'key-circle';
        key.appendChild(circle);
        key.addEventListener('click', () => onKeyClick(midi));
        keyboard.appendChild(key);

        if (midi % 12 === 0) {
            const label = document.createElement('div');
            label.className = 'octave-label';
            label.textContent = midiToName(midi);
            label.style.left = (whiteIndex * whiteWidth) + 'px';
            keyboard.appendChild(label);
        }
        if (!black) whiteIndex++;
    }
    keyboard.style.width = (whiteIndex * whiteWidth) + 'px';
}

function onKeyClick(midi) {
    if (phase !== 'guessing') return;

    if (selectedNotes.has(midi)) {
        selectedNotes.delete(midi);
    } else {
        selectedNotes.add(midi);
    }
    updateKeyboard();

    /* Play all currently selected notes as a chord (if setting is on) */
    if (settings.hearGuess) {
        playNotes(Array.from(selectedNotes));
    }
}

function updateKeyboard() {
    const correctNotes = new Set(answerNotes);
    keyboard.querySelectorAll('.piano-key').forEach((key) => {
        const midi = Number(key.dataset.midi);
        key.querySelector('.key-circle').classList.toggle('selected', selectedNotes.has(midi));
        key.classList.toggle('answer', phase === 'results' && correctNotes.has(midi));
        key.classList.toggle('disabled', phase === 'results');
    });
}

function showHintOnce() {
    volumeHint.classList.add('show');
    setTimeout(() => volumeHint.classList.remove('show'), 2000);
    playButton.removeEventListener('mouseenter', showHintOnce);
    playButton.removeEventListener('click', showHintOnce);
}

// Events
playButton.addEventListener('click', playChord);
submitButton.addEventListener('click', submitGuess);
nextButton.addEventListener('click', nextRound);
backButton.addEventListener('click', showPresets);

difficultyButtons.forEach((button) => {
    button.addEventListener('click', () => setDifficulty(Number(button.dataset.val)));
});
for (const [name, checkbox] of Object.entries(settingControls)) {
    checkbox.addEventListener('change', () => {
        settings[name] = checkbox.checked;
        if (name === 'inversions' && checkbox.checked) settings.chordsOnly = true;
        if (name === 'chordsOnly' && !checkbox.checked) settings.inversions = false;
        updateSettingsControls();
        restartRound();
    });
}
document.querySelectorAll('.preset-card').forEach((card) => {
    card.addEventListener('click', () => applyPreset(Number(card.dataset.preset)));
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || phase === 'presets') return;
    if (event.target.closest('button, input, summary, a')) return;
    event.preventDefault();
    if (phase === 'guessing') submitGuess();
    else if (phase === 'results') nextRound();
});

playButton.addEventListener('mouseenter', showHintOnce);
playButton.addEventListener('click', showHintOnce);

document.getElementById('settingsBtn').addEventListener('click', () => settingsPanel.classList.add('open'));
document.getElementById('settingsClose').addEventListener('click', () => settingsPanel.classList.remove('open'));

updateSettingsControls();
buildKeyboard();
