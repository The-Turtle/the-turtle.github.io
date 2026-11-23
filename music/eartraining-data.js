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

// Salamander Grand Piano samples, spaced about three semitones apart.
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

// Preset definitions
const PRESETS = [
    null, // index 0 unused
    { difficulty: 2, smallGaps: true,  doublings: false, chordsOnly: true,  inversions: false, hearGuess: true,  autoSelectLowest: true },
    { difficulty: 3, smallGaps: true,  doublings: false, chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 4, smallGaps: true,  doublings: true,  chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 5, smallGaps: false, doublings: true,  chordsOnly: true,  inversions: true,  hearGuess: true,  autoSelectLowest: true },
    { difficulty: 6, smallGaps: false, doublings: true,  chordsOnly: false, inversions: false, hearGuess: false, autoSelectLowest: true }
];
