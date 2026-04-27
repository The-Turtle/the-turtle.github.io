/* ======================================================
   Constants
   ====================================================== */
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const MIN_MIDI = 36; // C2
const MAX_MIDI = 84; // C6
const BLACK_SET = new Set([1, 3, 6, 8, 10]); // semitone indices within octave

const WHITE_W = 30;
const WHITE_H = 150;
const BLACK_W = 18;
const BLACK_H = 95;

/* ======================================================
   Chord definitions – keyed by number of notes (difficulty)
   ====================================================== */
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

/* ======================================================
   Preset definitions
   ====================================================== */
const PRESETS = [
    null, // index 0 unused
    { difficulty: 2, smallGaps: true,  doublings: false, chordsOnly: true,  inversions: false, hearGuess: true,  autoSelectLowest: true },
    { difficulty: 3, smallGaps: true,  doublings: false, chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 4, smallGaps: true,  doublings: true,  chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 5, smallGaps: false, doublings: true,  chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 6, smallGaps: false, doublings: true,  chordsOnly: false, inversions: false, hearGuess: false, autoSelectLowest: true }
];

/* ======================================================
   State
   ====================================================== */
let audioCtx = null;
let masterGain = null;
let difficulty = 3;
let currentNotes = [];        // MIDI numbers (the answer)
let selectedNotes = new Set(); // MIDI numbers the user picked
let roundActive = false;
let submitted = false;
let activeSources = [];

/* Sample buffers: midi → AudioBuffer */
let sampleBuffers = {};
let samplesLoaded = false;
let samplesLoading = false;

/* Settings (toggled from corner controls) */
let hearGuess = true;         // play selected notes on each click
let autoSelectLowest = true;  // auto-select the lowest note each round
let doublings = false;        // allow same pitch class in different octaves
let chordsOnly = true;        // draw from tertian chord distribution
let inversions = false;       // allow chord inversions
let smallGaps = true;         // consecutive notes ≤ 1 octave apart

/* Saved toggle state for chords/inversions when difficulty ≥ 6 */
let savedChordsOnly = null;
let savedInversions = null;

/* Hide auto-selected note until the user presses Play for the first time.
   Reset to true whenever settings or difficulty change. */
let needsFirstPlay = true;

/* ======================================================
   Helpers
   ====================================================== */
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
}

/**
 * Fetch and decode all piano samples into AudioBuffers.
 * Called lazily on first playback so the AudioContext exists.
 */
async function loadSamples() {
    if (samplesLoaded || samplesLoading) return;
    samplesLoading = true;

    var promises = SAMPLES.map(function (s) {
        return fetch(SAMPLE_PATH + s.name + '.mp3')
            .then(function (r) { return r.arrayBuffer(); })
            .then(function (buf) { return audioCtx.decodeAudioData(buf); })
            .then(function (decoded) {
                sampleBuffers[s.midi] = decoded;
            })
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
    if (!notes.length) return;
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
        noteGain.gain.value = noteVol;

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
        if (autoSelectLowest && currentNotes.length > 0) {
            selectedNotes.add(currentNotes[0]);
            updateKeyboard();
        }
    }
    await playNotes(currentNotes);
}

/* ======================================================
   Note generation helpers
   ====================================================== */

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

/* ======================================================
   Note generation – main entry
   ====================================================== */
function generateNotes() {
    if (chordsOnly && difficulty <= 5) {
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
    var chordList = CHORDS[difficulty];
    if (!chordList || chordList.length === 0) {
        throw new Error('No chords defined for difficulty ' + difficulty + '.');
    }

    var maxAttempts = 300;
    for (var a = 0; a < maxAttempts; a++) {
        /* Pick a random chord */
        var chord = chordList[Math.floor(Math.random() * chordList.length)];
        var raw = chord.intervals;

        /* Skip if doublings not allowed and chord has duplicate pitch classes */
        if (!doublings && hasDoublings(raw)) continue;

        if (smallGaps) {
            /* ── Compact voicing: permute, stack, translate ── */
            var permuted = inversions ? shuffleArray(raw) : shuffleKeepFirst(raw);
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
            if (!inversions && notes[0] % 12 !== rootPC) continue;

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
        /* Step 1: pick random MIDI notes from the range */
        var notes = [];
        var seen = new Set();
        var usedPC = new Set();
        var tries = 0;
        while (notes.length < difficulty && tries < 500) {
            tries++;
            var m = MIN_MIDI + Math.floor(Math.random() * (MAX_MIDI - MIN_MIDI + 1));
            if (seen.has(m)) continue;
            if (!doublings && usedPC.has(m % 12)) continue;
            notes.push(m);
            seen.add(m);
            usedPC.add(m % 12);
        }
        if (notes.length < difficulty) continue;

        /* Step 2: sort ascending */
        notes.sort(function (x, y) { return x - y; });

        /* Step 3: if small gaps, reduce consecutive intervals > 12
           then uniformly translate into range */
        if (smallGaps) {
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

/* ======================================================
   Keyboard rendering
   ====================================================== */
function buildKeyboard() {
    var container = document.getElementById('keyboard');
    container.innerHTML = '';

    /* Catalogue keys */
    var whiteIdx = 0;
    var keys = [];

    for (var midi = MIN_MIDI; midi <= MAX_MIDI; midi++) {
        if (isBlack(midi)) {
            keys.push({ midi: midi, type: 'black', whitePos: whiteIdx });
        } else {
            keys.push({ midi: midi, type: 'white', index: whiteIdx });
            whiteIdx++;
        }
    }

    var totalWhite = whiteIdx;
    var totalWidth = totalWhite * WHITE_W;

    container.style.width = totalWidth + 'px';
    container.style.height = (WHITE_H + 24) + 'px';
    container.style.position = 'relative';

    /* White keys */
    keys.forEach(function (k) {
        if (k.type !== 'white') return;

        var div = document.createElement('div');
        div.className = 'piano-key white-key';
        div.dataset.midi = k.midi;
        div.style.left = (k.index * WHITE_W) + 'px';
        div.style.width = WHITE_W + 'px';
        div.style.height = WHITE_H + 'px';
        div.style.top = '0';

        var circle = document.createElement('div');
        circle.className = 'key-circle';
        div.appendChild(circle);

        div.addEventListener('click', function () { onKeyClick(k.midi); });
        container.appendChild(div);

        /* Octave labels on every C */
        if (k.midi % 12 === 0) {
            var label = document.createElement('div');
            label.className = 'octave-label';
            label.textContent = midiToName(k.midi);
            label.style.left = (k.index * WHITE_W) + 'px';
            label.style.width = WHITE_W + 'px';
            label.style.top = (WHITE_H + 4) + 'px';
            label.style.textAlign = 'center';
            container.appendChild(label);
        }
    });

    /* Black keys (rendered after so they sit on top in DOM order) */
    keys.forEach(function (k) {
        if (k.type !== 'black') return;

        var div = document.createElement('div');
        div.className = 'piano-key black-key';
        div.dataset.midi = k.midi;
        div.style.left = (k.whitePos * WHITE_W - BLACK_W / 2) + 'px';
        div.style.width = BLACK_W + 'px';
        div.style.height = BLACK_H + 'px';
        div.style.top = '0';

        var circle = document.createElement('div');
        circle.className = 'key-circle';
        div.appendChild(circle);

        div.addEventListener('click', function () { onKeyClick(k.midi); });
        container.appendChild(div);
    });
}

/* ======================================================
   Keyboard interaction
   ====================================================== */
function onKeyClick(midi) {
    if (!roundActive || submitted) return;

    if (selectedNotes.has(midi)) {
        selectedNotes.delete(midi);
    } else {
        selectedNotes.add(midi);
    }
    updateKeyboard();

    /* Play all currently selected notes as a chord (if setting is on) */
    if (hearGuess && selectedNotes.size > 0) {
        playNotes(Array.from(selectedNotes));
    } else if (selectedNotes.size === 0) {
        stopPlayback();
    }
}

function updateKeyboard() {
    var correctSet = new Set(currentNotes);

    var allKeys = document.querySelectorAll('.piano-key');
    allKeys.forEach(function (div) {
        var midi = parseInt(div.dataset.midi, 10);
        var circle = div.querySelector('.key-circle');

        /* Reset */
        circle.className = 'key-circle';
        div.classList.remove('answer');

        if (submitted) {
            /* Blue dot stays on every key the user selected */
            if (selectedNotes.has(midi)) {
                circle.classList.add('selected');
            }
            /* Highlight the entire key for every note in the answer */
            if (correctSet.has(midi)) {
                div.classList.add('answer');
            }
            div.classList.add('disabled');
        } else {
            div.classList.remove('disabled');
            if (selectedNotes.has(midi)) {
                circle.classList.add('selected');
            }
        }
    });
}

/* ======================================================
   Game flow
   ====================================================== */
function startRound() {
    currentNotes = generateNotes();
    selectedNotes.clear();
    submitted = false;
    roundActive = true;

    /* Auto-select the lowest note — but only if we've already
       pressed Play at least once (not in a "cold start" state). */
    if (!needsFirstPlay && autoSelectLowest && currentNotes.length > 0) {
        selectedNotes.add(currentNotes[0]);
    }

    document.getElementById('submitBtn').style.display = '';
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('nextBtn').style.display = 'none';
    var fb = document.getElementById('feedback');
    fb.textContent = '';
    fb.style.color = '';
    fb.classList.remove('visible');

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

    var feedbackEl = document.getElementById('feedback');
    feedbackEl.innerHTML = '';

    if (isExactMatch) {
        feedbackEl.textContent = '\u2714 Correct';
        feedbackEl.style.color = '#2e7d32';
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
        feedbackEl.innerHTML = parts.join('\u2002');
    }

    feedbackEl.classList.add('visible');

    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = '';
    document.getElementById('nextBtn').focus();

    updateKeyboard();
}

async function nextRound() {
    startRound();
    if (audioCtx) {
        await playChord();
    }
}

/* ======================================================
   Difficulty selector
   ====================================================== */
function initDifficulty() {
    var btns = document.querySelectorAll('.diff-btn');
    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            btns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            difficulty = parseInt(btn.dataset.val, 10);

            /* For 6+ notes there are no chord definitions →
               save current state, turn chords/inversions off and disable */
            var chordsEl = document.getElementById('chordsOnlyToggle');
            var inversionsEl = document.getElementById('inversionsToggle');
            if (difficulty >= 6) {
                /* Save only on the first transition into ≥ 6 */
                if (savedChordsOnly === null) {
                    savedChordsOnly = chordsOnly;
                    savedInversions = inversions;
                }
                if (chordsEl) {
                    chordsEl.checked = false;
                    chordsEl.disabled = true;
                    chordsOnly = false;
                }
                if (inversionsEl) {
                    inversionsEl.checked = false;
                    inversionsEl.disabled = true;
                    inversions = false;
                }
            } else {
                /* Restore saved state when returning to ≤ 5 */
                if (savedChordsOnly !== null) {
                    chordsOnly = savedChordsOnly;
                    inversions = savedInversions;
                    if (chordsEl) chordsEl.checked = chordsOnly;
                    if (inversionsEl) inversionsEl.checked = inversions;
                    savedChordsOnly = null;
                    savedInversions = null;
                }
                if (chordsEl) chordsEl.disabled = false;
                if (inversionsEl) inversionsEl.disabled = false;
            }

            /* Start a fresh round whenever difficulty changes */
            stopPlayback();
            needsFirstPlay = true;
            startRound();
        });
    });
}

/* ======================================================
   Settings (corner controls)
   ====================================================== */
function initSettings() {
    var toggles = [
        { id: 'hearGuessToggle',   setter: function (v) { hearGuess = v; } },
        { id: 'autoLowestToggle',  setter: function (v) { autoSelectLowest = v; } },
        { id: 'smallGapsToggle',   setter: function (v) { smallGaps = v; } },
        { id: 'doublingsToggle',   setter: function (v) { doublings = v; } },
        { id: 'chordsOnlyToggle',  setter: function (v) { chordsOnly = v; } },
        { id: 'inversionsToggle',  setter: function (v) { inversions = v; } }
    ];

    var chordsEl = document.getElementById('chordsOnlyToggle');
    var inversionsEl = document.getElementById('inversionsToggle');

    toggles.forEach(function (t) {
        var el = document.getElementById(t.id);
        if (!el) return;
        /* Sync JS state with the checkbox default */
        t.setter(el.checked);
        el.addEventListener('change', function () {
            t.setter(el.checked);

            /* Inversions on → force chords on */
            if (t.id === 'inversionsToggle' && el.checked && chordsEl && !chordsEl.checked) {
                chordsEl.checked = true;
                chordsOnly = true;
            }
            /* Chords off → force inversions off */
            if (t.id === 'chordsOnlyToggle' && !el.checked && inversionsEl && inversionsEl.checked) {
                inversionsEl.checked = false;
                inversions = false;
            }

            /* Any setting change → new chord, hide auto-select until Play */
            stopPlayback();
            needsFirstPlay = true;
            startRound();
        });
    });
}

/* ======================================================
   Initialisation & event wiring
   ====================================================== */
document.addEventListener('DOMContentLoaded', function () {
    initDifficulty();
    initSettings();
    buildKeyboard();

    document.getElementById('playBtn').addEventListener('click', playChord);

    document.getElementById('submitBtn').addEventListener('click', submitGuess);
    document.getElementById('nextBtn').addEventListener('click', nextRound);

    /* Enter key: submit if mid-round, advance if reviewing */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            if (roundActive && !submitted) {
                submitGuess();
            } else if (submitted) {
                nextRound();
            }
        }
    });

    /* Volume hint: show once on first hover / click of Play */
    var hint = document.getElementById('volumeHint');
    var playBtn = document.getElementById('playBtn');
    function showHintOnce() {
        hint.classList.add('show');
        setTimeout(function () { hint.classList.remove('show'); }, 2000);
        playBtn.removeEventListener('mouseenter', showHintOnce);
        playBtn.removeEventListener('click', showHintOnce);
    }
    playBtn.addEventListener('mouseenter', showHintOnce);
    playBtn.addEventListener('click', showHintOnce);

    /* Collapsible settings panel */
    var settingsBtn = document.getElementById('settingsBtn');
    var settingsClose = document.getElementById('settingsClose');
    var settingsPanel = document.getElementById('settingsPanel');
    if (settingsBtn && settingsPanel) {
        settingsBtn.addEventListener('click', function () {
            settingsPanel.classList.add('open');
        });
    }
    if (settingsClose && settingsPanel) {
        settingsClose.addEventListener('click', function () {
            settingsPanel.classList.remove('open');
        });
    }

    /* Preset cards */
    var presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var idx = parseInt(card.dataset.preset, 10);
            applyPreset(idx);
        });
    });

    /* Don't auto-start — wait for preset selection */
});

/**
 * Apply a preset: update all settings, sync UI, hide splash, show game, start round.
 */
function applyPreset(idx) {
    var p = PRESETS[idx];
    if (!p) return;

    /* Update JS state */
    difficulty = p.difficulty;
    smallGaps = p.smallGaps;
    doublings = p.doublings;
    chordsOnly = p.chordsOnly;
    inversions = p.inversions;
    hearGuess = p.hearGuess;
    autoSelectLowest = p.autoSelectLowest;

    /* Sync difficulty buttons */
    var btns = document.querySelectorAll('.diff-btn');
    btns.forEach(function (b) {
        b.classList.toggle('active', parseInt(b.dataset.val, 10) === difficulty);
    });

    /* Sync toggle checkboxes */
    var map = {
        smallGapsToggle: smallGaps,
        doublingsToggle: doublings,
        chordsOnlyToggle: chordsOnly,
        inversionsToggle: inversions,
        hearGuessToggle: hearGuess,
        autoLowestToggle: autoSelectLowest
    };
    for (var id in map) {
        var el = document.getElementById(id);
        if (el) el.checked = map[id];
    }

    /* Handle chords/inversions disabled state for difficulty >= 6 */
    var chordsEl = document.getElementById('chordsOnlyToggle');
    var inversionsEl = document.getElementById('inversionsToggle');
    if (difficulty >= 6) {
        if (chordsEl) { chordsEl.disabled = true; }
        if (inversionsEl) { inversionsEl.disabled = true; }
        savedChordsOnly = null;
        savedInversions = null;
    } else {
        if (chordsEl) { chordsEl.disabled = false; }
        if (inversionsEl) { inversionsEl.disabled = false; }
    }

    /* Hide splash, show game */
    var presetScreen = document.getElementById('presetScreen');
    var gameArea = document.getElementById('gameArea');
    if (presetScreen) presetScreen.style.display = 'none';
    if (gameArea) gameArea.classList.add('active');

    /* Start the game */
    needsFirstPlay = true;
    startRound();
}