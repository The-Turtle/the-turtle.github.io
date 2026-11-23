// Constants
const MIN_FREQ = 10 / 60; // 10 BPM in Hz  (~0.167 Hz)
const MAX_FREQ = 10000; // 10 kHz

/*  SIGMA – Gaussian pulse width in seconds.
    The key ratio is κ = SIGMA × freq:
      κ ≪ 1  →  sharp, separated Gaussian clicks (many harmonics)
      κ ≫ 1  →  pure sine wave (only fundamental survives)
    Transition around freq ≈ 0.3 / SIGMA.
    With SIGMA = 5e-4 the crossover is ~600 Hz. */
const SIGMA = 5e-4;
const FADE_TIME = 0.03; // 30 ms fade-in / fade-out to avoid clicks

// Page elements
const guessInput = document.getElementById("guessInput");
const playButton = document.getElementById("toggleBtn");
const submitButton = document.getElementById("submitBtn");
const nextButton = document.getElementById("nextBtn");
const feedback = document.getElementById("feedback");
const referenceA = document.getElementById("refA");
const canvas = document.getElementById("graph");
const hint = document.getElementById("volumeHint");

// State
let currentFrequency = null;
let audioContext = null;
let gainNode = null;
let currentSource = null;
let guessData = []; // { freq, guessHz, error }
let roundActive = false;

// Game flow
async function nextRound() {
    currentFrequency = sampleFreq();

    guessInput.disabled = false;
    guessInput.value = "";
    guessInput.focus();

    submitButton.disabled = false;
    submitButton.style.display = "";
    nextButton.style.display = "none";
    playButton.disabled = false;
    feedback.textContent = "";

    roundActive = true;
    if (audioContext) await playTone();
}

function submitGuess() {
    if (!roundActive) return;

    const rawGuess = guessInput.value.trim();
    const guess = parseGuess(rawGuess);
    if (guess == null) {
        feedback.innerHTML =
            '<span style="color:#c62828">Invalid input. Try: 440 Hz, 120 BPM, or C#4+25c</span>';
        return;
    }

    roundActive = false;
    stopTone(true);  // fade out on submit
    playButton.disabled = true;

    /* Error in octaves (log₂ ratio) */
    const errorOctaves = Math.log2(guess.hz / currentFrequency);
    guessData.push({
        freq: currentFrequency,
        guessHz: guess.hz,
        error: errorOctaves,
    });

    feedback.textContent =
        `Correct answer: ${formatCorrectAnswer(currentFrequency, guess.format)}`;

    drawGraph();

    guessInput.disabled = true;
    submitButton.style.display = "none";
    nextButton.style.display = "";
    nextButton.focus();
}

/* ======================================================
   Audio – Web Audio API Gaussian pulse-train synthesis

   The waveform is a periodic sum of Gaussians (width σ),
   DC-subtracted and normalized so the peak equals 1.

   Fourier form (used when κ = σf is not too small):
     F(t) = Σ aₙ cos(2πnft) / Σ aₙ
     where aₙ = exp(−2π²n²κ²)

   Time-domain form (used when κ is small):
     F(t) = [Σ exp(−(t−n/f)²/2σ²) − fσ√2π]
            / [Σ exp(−n²/2κ²) − fσ√2π]

   Both are mathematically identical (Poisson summation).
   We pick whichever converges faster.
   ====================================================== */
function initAudio() {
    audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;
    gainNode.connect(audioContext.destination);

    /* Safari unlock: send a silent buffer synchronously inside the
       user gesture so the context isn't left muted. */
    const silent = audioContext.createBufferSource();
    silent.buffer = audioContext.createBuffer(1, 1, 22050);
    silent.connect(audioContext.destination);
    silent.start(0);
}

/**
 * Build a looping AudioBuffer containing the Gaussian
 * pulse-train waveform at the given frequency.
 */
function buildToneBuffer(freq) {
    const sampleRate = audioContext.sampleRate;
    const kappa = SIGMA * freq;
    const periodSamples = sampleRate / freq;

    /* Buffer: ≥1 full period, ~1 s for freq ≥ 1 Hz */
    const numPeriods = Math.max(1, Math.round(Math.max(freq, 1)));
    const sampleCount = Math.round(numPeriods * periodSamples);

    const audioBuffer = audioContext.createBuffer(1, sampleCount, sampleRate);
    const data = audioBuffer.getChannelData(0);

    if (kappa >= 0.1) {
        /* --- FOURIER FORM ---
           Normalized coefficients bₙ = exp(−2π²κ²(n²−1))
           so b₁ = 1, avoiding underflow when κ is large. */
        const c2 = 2 * Math.PI * Math.PI * kappa * kappa;
        const coeffs = [];
        let denom = 0;
        for (let n = 1; n <= 10000; n++) {
            const b = Math.exp(-c2 * (n * n - 1));
            coeffs.push(b);
            denom += b;
            if (b < 1e-10) break;
        }
        for (let i = 0; i < sampleCount; i++) {
            const phase = 2 * Math.PI * freq * i / sampleRate;
            let val = 0;
            for (let j = 0; j < coeffs.length; j++) {
                val += coeffs[j] * Math.cos((j + 1) * phase);
            }
            data[i] = val / denom;
        }
    } else {
        /* --- TIME-DOMAIN FORM ---
           Sum nearby Gaussians, subtract DC, normalise. */
        const twoSigSq = 2 * SIGMA * SIGMA;
        const dc = freq * SIGMA * Math.sqrt(2 * Math.PI);

        /* g(0) = Σ exp(−n²/2κ²) for denominator */
        let g0 = 1; // n = 0
        for (let n = 1; n <= 10000; n++) {
            const v = 2 * Math.exp(-n * n / (2 * kappa * kappa));
            if (v < 1e-15) break;
            g0 += v;
        }
        const denom = g0 - dc;

        for (let i = 0; i < sampleCount; i++) {
            const t = i / sampleRate;
            let gt = 0;
            /* Only sum Gaussians within ±4σ of this sample */
            const nCenter = t * freq;
            const nLo = Math.floor(nCenter - 4 * kappa) - 1;
            const nHi = Math.ceil(nCenter + 4 * kappa) + 1;
            for (let n = nLo; n <= nHi; n++) {
                const diff = t - n / freq;
                gt += Math.exp(-diff * diff / twoSigSq);
            }
            data[i] = (gt - dc) / denom;
        }
    }

    /* --- Volume normalization ---
       Peak-normalize to 1, then apply a frequency-dependent gain:

         gain(f) = 0.9 / (1 + f / 500)^0.25

       This is flat (~0.9) at low frequencies and gently rolls off
       above ~500 Hz, so high-pitched tones don't blast your ears
       while low-frequency clicks stay audible. */
    let peak = 0;
    for (let i = 0; i < sampleCount; i++) {
        const a = Math.abs(data[i]);
        if (a > peak) peak = a;
    }
    if (peak > 0) {
        const freqGain = 0.9 / Math.pow(1 + freq / 500, 0.25);
        const scale = freqGain / peak;
        for (let i = 0; i < sampleCount; i++) data[i] *= scale;
    }

    return audioBuffer;
}

async function playTone() {
    if (currentFrequency == null) return;
    if (!audioContext) initAudio();
    stopTone(false);   // immediate stop – the fade-in masks any click
    if (audioContext.state === "suspended") await audioContext.resume();

    currentSource = audioContext.createBufferSource();
    currentSource.buffer = buildToneBuffer(currentFrequency);
    currentSource.loop = true;
    currentSource.connect(gainNode);

    const now = audioContext.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + FADE_TIME);

    currentSource.start();
    updateToggleBtn();
}

/**
 * @param {boolean} fade – true  → smooth 30 ms fade-out (user stop / submit)
 *                         false → immediate stop (internal, before a new play)
 */
function stopTone(fade) {
    if (currentSource) {
        try {
            if (fade && audioContext) {
                const now = audioContext.currentTime;
                gainNode.gain.cancelScheduledValues(now);
                gainNode.gain.setValueAtTime(gainNode.gain.value, now);
                gainNode.gain.linearRampToValueAtTime(0, now + FADE_TIME);
                currentSource.stop(now + FADE_TIME);
            } else {
                currentSource.stop();
            }
        } catch (_) {}
        currentSource = null;
    }
    updateToggleBtn();
}

async function toggleTone() {
    if (currentSource) {
        stopTone(true);  // user-initiated → fade out
    } else {
        await playTone();
    }
}

function updateToggleBtn() {
    playButton.textContent = currentSource ? "⏹ Stop" : "▶ Play";
}

// Frequency sampling – log-uniform
function sampleFreq() {
    const lo = Math.log2(MIN_FREQ);
    const hi = Math.log2(MAX_FREQ);
    return Math.pow(2, Math.random() * (hi - lo) + lo);
}

// Input parsing – three formats
function getRefA() {
    return parseFloat(referenceA.value) || 440;
}

function parseGuess(raw) {
    const s = raw.trim();
    if (!s) return null;

    /* --- BPM --- */
    let m = s.match(/^([\d.]+)\s*bpm$/i);
    if (m) {
        const v = parseFloat(m[1]);
        return v > 0 ? { hz: v / 60, format: "bpm" } : null;
    }

    /* --- Note name  (e.g. C#4, A4+25c, Bb3-10 cents) --- */
    m = s.match(
        /^([A-Ga-g])([#b]?)(\d+)\s*(?:([+-])\s*(\d+(?:\.\d+)?)\s*(?:cents?|c)?)?\s*$/,
    );
    if (m) {
        const map = {
            C: 0,
            D: 2,
            E: 4,
            F: 5,
            G: 7,
            A: 9,
            B: 11,
        };
        let semi = map[m[1].toUpperCase()];
        if (semi == null) return null;
        if (m[2] === "#") semi++;
        if (m[2] === "b") semi--;
        const oct = parseInt(m[3]);
        const cents = m[5]
            ? (m[4] === "-" ? -1 : 1) * parseFloat(m[5])
            : 0;
        const midi = (oct + 1) * 12 + semi;
        const hz =
            getRefA() *
            Math.pow(2, (midi - 69 + cents / 100) / 12);
        return hz > 0 ? { hz, format: "note" } : null;
    }

    /* --- kHz --- */
    m = s.match(/^([\d.]+)\s*khz$/i);
    if (m) {
        const v = parseFloat(m[1]) * 1000;
        return v > 0 ? { hz: v, format: "khz" } : null;
    }

    /* --- Hz  (requires "Hz" suffix) --- */
    m = s.match(/^([\d.]+)\s*hz$/i);
    if (m) {
        const v = parseFloat(m[1]);
        return v > 0 ? { hz: v, format: "hz" } : null;
    }

    return null;
}

function formatSignificant(value, digits = 3) {
    if (value === 0) return "0";

    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const decimalPlaces = digits - exponent - 1;

    if (decimalPlaces > 0) return value.toFixed(decimalPlaces);

    const placeValue = Math.pow(10, -decimalPlaces);
    return String(Math.round(value / placeValue) * placeValue);
}

function formatNote(freq) {
    const midiValue = 69 + 12 * Math.log2(freq / getRefA());
    const nearestMidi = Math.round(midiValue);
    const pitchClass = ((nearestMidi % 12) + 12) % 12;
    const octave = Math.floor(nearestMidi / 12) - 1;
    const cents = Math.round((midiValue - nearestMidi) * 100);

    const exactNames = [
        "C", "C#", "D", "Eb", "E", "F",
        "F#", "G", "G#", "A", "Bb", "B",
    ];

    if (cents === 0) return `${exactNames[pitchClass]}${octave}`;

    const sharpNames = [
        "C", "C#", "D", "D#", "E", "F",
        "F#", "G", "G#", "A", "A#", "B",
    ];
    const flatNames = [
        "C", "Db", "D", "Eb", "E", "F",
        "Gb", "G", "Ab", "A", "Bb", "B",
    ];
    const noteName = cents < 0
        ? sharpNames[pitchClass]
        : flatNames[pitchClass];
    const sign = cents < 0 ? "−" : "+";

    return `${noteName}${octave}${sign}${Math.abs(cents)} cents`;
}

function formatCorrectAnswer(freq, format) {
    if (format === "bpm") {
        return `${formatSignificant(freq * 60)} BPM`;
    }
    if (format === "khz") {
        return `${formatSignificant(freq / 1000)} kHz`;
    }
    if (format === "note") return formatNote(freq);
    return `${formatSignificant(freq)} Hz`;
}

/* ======================================================
   Graph – Canvas 2D scatter plot
   X = frequency (log scale)
   Y = error in octaves
   ====================================================== */
function drawGraph() {
    const context = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const canvasWidth = canvas.parentElement.clientWidth;

    const marginLeft = 58,
        marginRight = 18,
        marginTop = 14,
        marginBottom = 50;
    const plotWidth = canvasWidth - marginLeft - marginRight;

    const xLo = Math.log2(MIN_FREQ);
    const xHi = Math.log2(MAX_FREQ);

    /* Fixed Y axis: ±1.5 octaves, divided into 12 semitones per octave */
    const yA = 1.5;
    const octavesX = xHi - xLo;
    const octavesY = 2 * yA;

    /* Enforce aspect ratio: 1 octave on Y = sqrt(12) × 1 octave on X */
    const pxPerOctX = plotWidth / octavesX;
    const pxPerOctY = Math.sqrt(12) * pxPerOctX;
    const plotHeight = Math.round(octavesY * pxPerOctY);
    const canvasHeight = plotHeight + marginTop + marginBottom;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const xPx = (lf) =>
        marginLeft + ((lf - xLo) / (xHi - xLo)) * plotWidth;
    const yPx = (e) => marginTop + ((yA - e) / (2 * yA)) * plotHeight;

    /* Background */
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "#fafafa";
    context.fillRect(marginLeft, marginTop, plotWidth, plotHeight);

    /* --- X grid lines at octaves of the reference A --- */
    context.strokeStyle = "#e0e0e0";
    context.lineWidth = 1;
    const refA = getRefA();
    const refALog2 = Math.log2(refA);
    for (let oct = Math.ceil(xLo - refALog2); oct <= Math.floor(xHi - refALog2); oct++) {
        const x = xPx(refALog2 + oct);
        if (x < marginLeft || x > marginLeft + plotWidth) continue;
        context.beginPath();
        context.moveTo(x, marginTop);
        context.lineTo(x, marginTop + plotHeight);
        context.stroke();
    }

    /* --- X labels at powers of 10 --- */
    context.font = "11px sans-serif";
    context.textBaseline = "top";
    context.fillStyle = "#888";
    context.textAlign = "center";
    [1, 10, 100, 1000, 10000].forEach((f) => {
        const x = xPx(Math.log2(f));
        if (x < marginLeft || x > marginLeft + plotWidth) return;
        const label =
            f >= 1000 ? f / 1000 + "k" : String(f);
        context.fillText(label + " Hz", x, marginTop + plotHeight + 7);
    });

    /* --- Y grid (semitones: 12 divisions per octave) --- */
    context.textAlign = "right";
    context.textBaseline = "middle";
    for (let s = -18; s <= 18; s++) {
        const val = s / 12;
        const y = yPx(val);
        if (s === 0) {
            context.strokeStyle = "#aaa";
            context.lineWidth = 1.5;
        } else if (s % 12 === 0) {
            context.strokeStyle = "#ccc";
            context.lineWidth = 1;
        } else {
            context.strokeStyle = "#ddd";
            context.lineWidth = 0.75;
        }
        context.beginPath();
        context.moveTo(marginLeft, y);
        context.lineTo(marginLeft + plotWidth, y);
        context.stroke();

        /* Labels at 0, ±½, ±1, ±1½ */
        if (s === 0 || s === 6 || s === -6 || s === 12 || s === -12 || s === 18 || s === -18) {
            context.fillStyle = "#888";
            const lbl = s === 0 ? "0"
                : s === 6 ? "+½"
                : s === -6 ? "-½"
                : s === 12 ? "+1"
                : s === -12 ? "-1"
                : s === 18 ? "≥+1½"
                : "≤-1½";
            context.fillText(lbl, marginLeft - 6, y);
        }
    }

    /* --- Axes --- */
    context.strokeStyle = "#555";
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(marginLeft, marginTop);
    context.lineTo(marginLeft, marginTop + plotHeight);
    context.lineTo(marginLeft + plotWidth, marginTop + plotHeight);
    context.stroke();

    /* --- Data points --- */
    context.fillStyle = "#2e7d32";
    for (const d of guessData) {
        const x = xPx(Math.log2(d.freq));
        const y = yPx(d.error);
        /* Clamp y to plot area so dots don't escape */
        const cy = Math.max(marginTop, Math.min(marginTop + plotHeight, y));
        context.beginPath();
        context.arc(x, cy, 3.5, 0, Math.PI * 2);
        context.fill();
    }

    /* --- Axis labels --- */
    context.fillStyle = "#555";
    context.font = "12px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText("Frequency", marginLeft + plotWidth / 2, canvasHeight - 14);

    context.save();
    context.translate(13, marginTop + plotHeight / 2);
    context.rotate(-Math.PI / 2);
    context.textBaseline = "top";
    context.fillText("Error (octaves)", 0, 0);
    context.restore();
}

function showHintOnce() {
    hint.classList.add("show");
    setTimeout(() => hint.classList.remove("show"), 2000);
    playButton.removeEventListener("mouseenter", showHintOnce);
    playButton.removeEventListener("click", showHintOnce);
}

// Events
playButton.addEventListener("click", toggleTone);
submitButton.addEventListener("click", submitGuess);
nextButton.addEventListener("click", nextRound);
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.target.closest("button, summary, a")) {
        e.preventDefault();
        if (roundActive) submitGuess();
        else if (nextButton.style.display !== "none") nextRound();
    }
});

/* Volume hint: show on first hover, hide after 2s, never again */
playButton.addEventListener("mouseenter", showHintOnce);
playButton.addEventListener("click", showHintOnce);

/* Mobile-friendly tooltip toggle */
document
    .getElementById("helpIcon")
    .addEventListener("click", function () {
        this.classList.toggle("show-tooltip");
    });

nextRound();
drawGraph();
window.addEventListener("resize", drawGraph);
