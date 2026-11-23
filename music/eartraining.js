// Constants
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const MIN_MIDI = 36; // C2
const MAX_MIDI = 84; // C6
const BLACK_SET = new Set([1, 3, 6, 8, 10]); // semitone indices within octave

// Chord definitions – keyed by number of notes (difficulty)
const CHORDS = {
    2: [
        { name: 'Minor 2nd',   intervals: [0, 1] },
        { name: 'Major 2nd',   intervals: [0, 2] },
        { name: 'Minor 3rd',   intervals: [0, 3] },
        { name: 'Major 3rd',   intervals: [0, 4] },
        { name: 'Perfect 4th', intervals: [0, 5] },
        { name: 'Tritone',     intervals: [0, 6] },
        { name: 'Perfect 5th', intervals: [0, 7] },
        { name: 'Minor 6th',   intervals: [0, 8] },
        { name: 'Major 6th',   intervals: [0, 9] },
        { name: 'Minor 7th',   intervals: [0, 10] },
        { name: 'Major 7th',   intervals: [0, 11] },
        { name: 'Octave',      intervals: [0, 12] }
    ],
    3: [
        { name: 'Major',      intervals: [0, 4, 7] },
        { name: 'Minor',      intervals: [0, 3, 7] },
        { name: 'Augmented',  intervals: [0, 4, 8] },
        { name: 'Diminished', intervals: [0, 3, 6] }
    ],
    4: [
        { name: 'Major 7th',              intervals: [0, 4, 7, 11] },
        { name: 'Dominant 7th',           intervals: [0, 4, 7, 10] },
        { name: 'Minor 7th',              intervals: [0, 3, 7, 10] },
        { name: 'Minor-major 7th',        intervals: [0, 3, 7, 11] },
        { name: 'Half-diminished 7th',    intervals: [0, 3, 6, 10] },
        { name: 'Diminished 7th',         intervals: [0, 3, 6, 9] },
        { name: 'Augmented major 7th',    intervals: [0, 4, 8, 11] },
        { name: 'Major (doubled root)',   intervals: [0, 4, 7, 12] },
        { name: 'Major (doubled 3rd)',    intervals: [0, 4, 7, 16] },
        { name: 'Minor (doubled root)',   intervals: [0, 3, 7, 12] },
        { name: 'Minor (doubled 3rd)',    intervals: [0, 3, 7, 15] },
        { name: 'Aug (doubled root)',     intervals: [0, 4, 8, 12] }
    ],
    5: [
        { name: 'Dominant 9th',                intervals: [0, 4, 7, 10, 14] },
        { name: 'Dominant minor 9th',          intervals: [0, 4, 7, 10, 13] },
        { name: 'Major 9th',                   intervals: [0, 4, 7, 11, 14] },
        { name: 'Minor 9th',                   intervals: [0, 3, 7, 10, 14] },
        { name: 'Dominant 7\u266F9',           intervals: [0, 4, 7, 10, 15] },
        { name: 'Major 6/9',                   intervals: [0, 4, 7, 9, 14] },
        { name: 'Minor 6/9',                   intervals: [0, 3, 7, 9, 14] },
        { name: 'Dominant 9sus4',              intervals: [0, 5, 7, 10, 14] },
        /* Doubled triads */
        { name: 'Major (doubled root & 3rd)',  intervals: [0, 4, 7, 12, 16] },
        { name: 'Major (doubled root & 5th)',  intervals: [0, 4, 7, 12, 19] },
        { name: 'Minor (doubled root & 3rd)',  intervals: [0, 3, 7, 12, 15] },
        { name: 'Minor (doubled root & 5th)',  intervals: [0, 3, 7, 12, 19] },
        { name: 'Aug (doubled root & 3rd)',    intervals: [0, 4, 8, 12, 16] },
        /* 7th chords with doubled root */
        { name: 'Maj7 (doubled root)',         intervals: [0, 4, 7, 11, 12] },
        { name: 'Dom7 (doubled root)',         intervals: [0, 4, 7, 10, 12] },
        { name: 'Min7 (doubled root)',         intervals: [0, 3, 7, 10, 12] },
        { name: 'Min-maj7 (doubled root)',     intervals: [0, 3, 7, 11, 12] },
        { name: 'Half-dim7 (doubled root)',    intervals: [0, 3, 6, 10, 12] },
        { name: 'Dim7 (doubled root)',         intervals: [0, 3, 6, 9, 12] },
        { name: 'Aug-maj7 (doubled root)',     intervals: [0, 4, 8, 11, 12] },
        /* 7th chords with other doublings */
        { name: 'Maj7 (doubled 3rd)',          intervals: [0, 4, 7, 11, 16] },
        { name: 'Maj7 (doubled 5th)',          intervals: [0, 4, 7, 11, 19] },
        { name: 'Dom7 (doubled 3rd)',          intervals: [0, 4, 7, 10, 16] },
        { name: 'Min-maj7 (doubled 3rd)',      intervals: [0, 3, 7, 11, 15] },
        { name: 'Min-maj7 (doubled 5th)',      intervals: [0, 3, 7, 11, 19] },
        { name: 'Min7 (doubled 3rd)',          intervals: [0, 3, 7, 10, 15] },
        { name: 'Min7 (doubled 5th)',          intervals: [0, 3, 7, 10, 19] },
        { name: 'Half-dim7 (doubled 3rd)',     intervals: [0, 3, 6, 10, 15] },
        { name: 'Aug-maj7 (doubled 3rd)',      intervals: [0, 4, 8, 11, 16] }
    ]
};

/* ======================================================
   Piano sample definitions (Salamander Grand Piano)
   Each sample covers ~3 semitones via pitch-shifting.
   ====================================================== */
const SAMPLE_PATH = '../files/audio/samples/piano/';
const SAMPLES = [
    { name: 'A0',  midi: 21  },
    { name: 'C1',  midi: 24  },
    { name: 'Ds1', midi: 27  },
    { name: 'Fs1', midi: 30  },
    { name: 'A1',  midi: 33  },
    { name: 'C2',  midi: 36  },
    { name: 'Ds2', midi: 39  },
    { name: 'Fs2', midi: 42  },
    { name: 'A2',  midi: 45  },
    { name: 'C3',  midi: 48  },
    { name: 'Ds3', midi: 51  },
    { name: 'Fs3', midi: 54  },
    { name: 'A3',  midi: 57  },
    { name: 'C4',  midi: 60  },
    { name: 'Ds4', midi: 63  },
    { name: 'Fs4', midi: 66  },
    { name: 'A4',  midi: 69  },
    { name: 'C5',  midi: 72  },
    { name: 'Ds5', midi: 75  },
    { name: 'Fs5', midi: 78  },
    { name: 'A5',  midi: 81  },
    { name: 'C6',  midi: 84  },
    { name: 'Ds6', midi: 87  },
    { name: 'Fs6', midi: 90  },
    { name: 'A6',  midi: 93  },
    { name: 'C7',  midi: 96  },
    { name: 'Ds7', midi: 99  },
    { name: 'Fs7', midi: 102 },
    { name: 'A7',  midi: 105 },
    { name: 'C8',  midi: 108 }
];

/* Pre-sorted array of just the MIDI values for quick nearest-lookup */
const sampleMidis = SAMPLES.map(function (s) { return s.midi; });

// Preset definitions
const PRESETS = [
    null, // index 0 unused
    { difficulty: 2, smallGaps: true,  doublings: false, chordsOnly: true,  inversions: false, hearGuess: true,  autoSelectLowest: true },
    { difficulty: 3, smallGaps: true,  doublings: false, chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 4, smallGaps: true,  doublings: true,  chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 5, smallGaps: false, doublings: true,  chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 6, smallGaps: false, doublings: true,  chordsOnly: false, inversions: false, hearGuess: false, autoSelectLowest: true }
];

// State
let audioCtx = null;
let masterGain = null;
let currentNotes = [];        // MIDI numbers (the answer)
let selectedNotes = new Set(); // MIDI numbers the user picked
let roundActive = false;
let submitted = false;
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

/* Hide auto-selected note until the user presses Play for the first time.
   Reset to true whenever settings or difficulty change. */
let needsFirstPlay = true;

// Helpers
function isBlack(midi) {
    return BLACK_SET.has(midi % 12);
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
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.75;
    masterGain.connect(audioCtx.destination);

    /* Safari unlock: send a silent buffer synchronously inside the
       user gesture so the context isn't left muted while loadSamples()
       awaits the network. */
    var silent = audioCtx.createBufferSource();
    silent.buffer = audioCtx.createBuffer(1, 1, 22050);
    silent.connect(audioCtx.destination);
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
    function decode(buf) {
        return new Promise(function (resolve, reject) {
            audioCtx.decodeAudioData(buf, resolve, reject);
        });
    }

    var promises = SAMPLES.map(function (s) {
        return fetch(SAMPLE_PATH + s.name + '.mp3')
            .then(function (r) { return r.arrayBuffer(); })
            .then(decode)
            .then(function (decoded) { sampleBuffers[s.midi] = decoded; })
            .catch(function (err) {
                console.warn('Failed to load sample ' + s.name + ':', err);
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
    var best = null;
    var bestDist = Infinity;
    for (var i = 0; i < sampleMidis.length; i++) {
        var m = sampleMidis[i];
        if (sampleBuffers[m] === undefined) continue; // skip failed loads
        var dist = Math.abs(midi - m);
        if (dist < bestDist) {
            bestDist = dist;
            best = m;
        }
    }
    return best;
}

function stopPlayback() {
    activeSources.forEach(function (s) {
        try { s.stop(); } catch (_) {}
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
    if (!audioCtx) initAudio();
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    if (!samplesLoaded) await loadSamples();
    stopPlayback();

    var now = audioCtx.currentTime;
    /* Scale per-note volume so chords don't clip */
    var noteVol = 0.55 / Math.sqrt(notes.length);

    notes.forEach(function (midi) {
        var sampleMidi = findNearestSample(midi);
        if (sampleMidi === null) return;

        var rate = Math.pow(2, (midi - sampleMidi) / 12);

        var src = audioCtx.createBufferSource();
        src.buffer = sampleBuffers[sampleMidi];
        src.playbackRate.value = rate;

        var noteGain = audioCtx.createGain();
        noteGain.gain.value = noteVol / Math.sqrt(rate);

        src.connect(noteGain);
        noteGain.connect(masterGain);

        src.start(now);
        activeSources.push(src);
    });
}

async function playChord() {
    if (needsFirstPlay) {
        needsFirstPlay = false;
        /* Do the deferred auto-select now that the user has heard the chord */
        if (settings.autoSelectLowest && currentNotes.length > 0) {
            selectedNotes.add(currentNotes[0]);
            updateKeyboard();
        }
    }
    await playNotes(currentNotes);
}

// Note generation helpers

/**
 * Check whether an interval set contains duplicate pitch classes.
 */
function hasDoublings(intervals) {
    var pcs = new Set();
    for (var i = 0; i < intervals.length; i++) {
        var pc = ((intervals[i] % 12) + 12) % 12;
        if (pcs.has(pc)) return true;
        pcs.add(pc);
    }
    return false;
}

/**
 * Fisher-Yates shuffle of the entire array (returns a new array).
 */
function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

/**
 * Shuffle all elements except the first (returns a new array).
 */
function shuffleKeepFirst(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i >= 2; i--) {
        var j = 1 + Math.floor(Math.random() * i);
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
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
        var pcPrev = permutedIntervals[i - 1] % 12;
        var pcCurr = permutedIntervals[i] % 12;
        var gap = (pcCurr - pcPrev + 12) % 12;
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
    var minT = MIN_MIDI;
    var maxT = MAX_MIDI - span;
    if (maxT < minT) return null;
    var t = minT + Math.floor(Math.random() * (maxT - minT + 1));
    return intervals.map(function (iv) { return t + iv; });
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
    for (var a = 0; a < maxAttempts; a++) {
        /* Pick a random chord */
        var chord = chordList[Math.floor(Math.random() * chordList.length)];
        var raw = chord.intervals;

        /* Skip if doublings not allowed and chord has duplicate pitch classes */
        if (!settings.doublings && hasDoublings(raw)) continue;

        if (settings.smallGaps) {
            /* ── Compact voicing: permute, stack, translate ── */
            var permuted = settings.inversions ? shuffleArray(raw) : shuffleKeepFirst(raw);
            var intervals = buildVoicing(permuted);

            /* Safety check (should always pass for distinct PCs) */
            var ok = true;
            for (var i = 1; i < intervals.length; i++) {
                if (intervals[i] - intervals[i - 1] > 12) { ok = false; break; }
            }
            if (!ok) continue;

            var notes = uniformTranslate(intervals);
            if (notes) return notes;
        } else {
            /* ── Wide voicing: each note at a random octave ── */
            var rootPC = Math.floor(Math.random() * 12);
            var absPCs = raw.map(function (iv) { return (rootPC + (iv % 12)) % 12; });

            var notes = [];
            var valid = true;
            for (var i = 0; i < absPCs.length; i++) {
                var pc = absPCs[i];
                var candidates = [];
                for (var m = MIN_MIDI; m <= MAX_MIDI; m++) {
                    if (m % 12 === pc && notes.indexOf(m) === -1) {
                        candidates.push(m);
                    }
                }
                if (candidates.length === 0) { valid = false; break; }
                notes.push(candidates[Math.floor(Math.random() * candidates.length)]);
            }
            if (!valid) continue;

            notes.sort(function (x, y) { return x - y; });

            /* If inversions off, the root pitch class must be the lowest note */
            if (!settings.inversions && notes[0] % 12 !== rootPC) continue;

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
    for (var a = 0; a < maxAttempts; a++) {
        /* Pick random MIDI notes from the range. */
        var notes = [];
        var seen = new Set();
        var usedPC = new Set();
        var tries = 0;
        while (notes.length < settings.difficulty && tries < 500) {
            tries++;
            var m = MIN_MIDI + Math.floor(Math.random() * (MAX_MIDI - MIN_MIDI + 1));
            if (seen.has(m)) continue;
            if (!settings.doublings && usedPC.has(m % 12)) continue;
            notes.push(m);
            seen.add(m);
            usedPC.add(m % 12);
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
                var intervals = notes.map(function (n) { return n - bass; });
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
    if (!roundActive || submitted) return;

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
    const correctNotes = new Set(currentNotes);
    keyboard.querySelectorAll('.piano-key').forEach((key) => {
        const midi = Number(key.dataset.midi);
        key.querySelector('.key-circle').classList.toggle('selected', selectedNotes.has(midi));
        key.classList.toggle('answer', submitted && correctNotes.has(midi));
        key.classList.toggle('disabled', submitted);
    });
}

// Game flow
function startRound() {
    currentNotes = generateNotes();
    selectedNotes.clear();
    submitted = false;
    roundActive = true;

    /* Auto-select the lowest note — but only if we've already
       pressed Play at least once (not in a "cold start" state). */
    if (!needsFirstPlay && settings.autoSelectLowest && currentNotes.length > 0) {
        selectedNotes.add(currentNotes[0]);
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
    if (!roundActive || submitted) return;
    submitted = true;
    roundActive = false;

    stopPlayback();

    /* Build per-note feedback: ✓ for correct, ✗ for missed/extra */
    var correctSet = new Set(currentNotes);
    var isExactMatch = selectedNotes.size === currentNotes.length &&
        currentNotes.every(function (n) { return selectedNotes.has(n); });

    feedback.innerHTML = '';

    if (isExactMatch) {
        feedback.textContent = '\u2714 Correct';
        feedback.style.color = '#2e7d32';
    } else {
        /* Show each answer note with ✓ or ✗ */
        var parts = currentNotes.map(function (n) {
            var name = midiToName(n);
            if (selectedNotes.has(n)) {
                return '<span style="color:#2e7d32">\u2714\u2009' + name + '</span>';
            } else {
                return '<span style="color:#c62828">\u2718\u2009' + name + '</span>';
            }
        });
        /* Append any extra notes the user selected that aren't in the answer */
        var extras = [];
        selectedNotes.forEach(function (n) {
            if (!correctSet.has(n)) extras.push(n);
        });
        extras.sort(function (a, b) { return a - b; });
        extras.forEach(function (n) {
            parts.push('<span style="color:#c62828">\u2718\u2009' + midiToName(n) + '</span>');
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
    if (audioCtx) {
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
    restartRound();
}

function showPresets() {
    stopPlayback();
    roundActive = false;
    submitted = false;
    selectedNotes.clear();
    gameArea.hidden = true;
    presetScreen.hidden = false;
}

// These scripts use defer, so the controls already exist.
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
    if (event.key !== 'Enter' || gameArea.hidden) return;
    if (event.target.closest('button, input, summary, a')) return;
    event.preventDefault();
    if (roundActive) submitGuess();
    else if (submitted) nextRound();
});

const volumeHint = document.getElementById('volumeHint');
function showHintOnce() {
    volumeHint.classList.add('show');
    setTimeout(() => volumeHint.classList.remove('show'), 2000);
    playButton.removeEventListener('mouseenter', showHintOnce);
    playButton.removeEventListener('click', showHintOnce);
}
playButton.addEventListener('mouseenter', showHintOnce);
playButton.addEventListener('click', showHintOnce);

const settingsPanel = document.getElementById('settingsPanel');
document.getElementById('settingsBtn').addEventListener('click', () => settingsPanel.classList.add('open'));
document.getElementById('settingsClose').addEventListener('click', () => settingsPanel.classList.remove('open'));

updateSettingsControls();
buildKeyboard();
