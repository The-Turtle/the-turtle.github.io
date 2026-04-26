/* ======================================================
   Constants
   ====================================================== */
const MIN_FREQ = 10 / 60; // 10 BPM in Hz  (~0.167 Hz)
const MAX_FREQ = 10000; // 10 kHz

/*  SIGMA – Gaussian pulse width in seconds.
    The key ratio is κ = SIGMA × freq:
      κ ≪ 1  →  sharp, separated Gaussian clicks (many harmonics)
      κ ≫ 1  →  pure sine wave (only fundamental survives)
    Transition around freq ≈ 0.3 / SIGMA.
    With SIGMA = 5e-4 the crossover is ~600 Hz. */
const SIGMA = 5e-4;

/* ======================================================
   State
   ====================================================== */
let currentFreq = null;
let audioCtx = null;
let gainNode = null;
let currentSrc = null;
let guessData = []; // { freq, guessHz, error }
let roundActive = false;

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
    audioCtx = new (window.AudioContext ||
        window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.5;
    gainNode.connect(audioCtx.destination);
}

/**
 * Build a looping AudioBuffer containing the Gaussian
 * pulse-train waveform at the given frequency.
 */
function buildToneBuffer(freq) {
    const sr = audioCtx.sampleRate;
    const kappa = SIGMA * freq;
    const periodSamples = sr / freq;

    /* Buffer: ≥1 full period, ~1 s for freq ≥ 1 Hz */
    const numPeriods = Math.max(1, Math.round(Math.max(freq, 1)));
    const bufLen = Math.round(numPeriods * periodSamples);

    const buf = audioCtx.createBuffer(1, bufLen, sr);
    const data = buf.getChannelData(0);

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
        for (let i = 0; i < bufLen; i++) {
            const phase = 2 * Math.PI * freq * i / sr;
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

        for (let i = 0; i < bufLen; i++) {
            const t = i / sr;
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
    for (let i = 0; i < bufLen; i++) {
        const a = Math.abs(data[i]);
        if (a > peak) peak = a;
    }
    if (peak > 0) {
        const freqGain = 0.9 / Math.pow(1 + freq / 500, 0.25);
        const scale = freqGain / peak;
        for (let i = 0; i < bufLen; i++) data[i] *= scale;
    }

    return buf;
}

async function playTone() {
    if (currentFreq == null) return;
    if (!audioCtx) initAudio();
    stopTone();
    if (audioCtx.state === "suspended") await audioCtx.resume();

    currentSrc = audioCtx.createBufferSource();
    currentSrc.buffer = buildToneBuffer(currentFreq);
    currentSrc.loop = true;
    currentSrc.connect(gainNode);
    currentSrc.start();
    updateToggleBtn();
}

function stopTone() {
    if (currentSrc) {
        try {
            currentSrc.stop();
        } catch (_) {}
        currentSrc = null;
    }
    updateToggleBtn();
}

async function toggleTone() {
    if (currentSrc) {
        stopTone();
    } else {
        await playTone();
    }
}

function updateToggleBtn() {
    const btn = document.getElementById("toggleBtn");
    if (!btn) return;
    btn.textContent = currentSrc ? "⏹ Stop" : "▶ Play";
}

/* ======================================================
   Frequency sampling – log-uniform
   ====================================================== */
function sampleFreq() {
    const lo = Math.log2(MIN_FREQ);
    const hi = Math.log2(MAX_FREQ);
    return Math.pow(2, Math.random() * (hi - lo) + lo);
}

/* ======================================================
   Input parsing – three formats
   ====================================================== */
function getRefA() {
    return (
        parseFloat(document.getElementById("refA").value) || 440
    );
}

function parseGuess(raw) {
    const s = raw.trim();
    if (!s) return null;

    /* --- BPM --- */
    let m = s.match(/^([\d.]+)\s*bpm$/i);
    if (m) {
        const v = parseFloat(m[1]);
        return v > 0 ? v / 60 : null;
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
        return hz > 0 ? hz : null;
    }

    /* --- kHz --- */
    m = s.match(/^([\d.]+)\s*khz$/i);
    if (m) {
        const v = parseFloat(m[1]) * 1000;
        return v > 0 ? v : null;
    }

    /* --- Hz  (requires "Hz" suffix) --- */
    m = s.match(/^([\d.]+)\s*hz$/i);
    if (m) {
        const v = parseFloat(m[1]);
        return v > 0 ? v : null;
    }

    return null;
}

/* ======================================================
   Game logic
   ====================================================== */
async function nextRound() {
    currentFreq = sampleFreq();

    const inp = document.getElementById("guessInput");
    inp.disabled = false;
    inp.value = "";
    inp.focus();

    document.getElementById("submitBtn").disabled = false;
    document.getElementById("submitBtn").style.display = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("toggleBtn").disabled = false;
    document.getElementById("feedback").textContent = "";

    roundActive = true;
    if (audioCtx) await playTone();
}

function submitGuess() {
    if (!roundActive) return;

    const inp = document.getElementById("guessInput");
    const hz = parseGuess(inp.value);
    if (hz == null) {
        document.getElementById("feedback").innerHTML =
            '<span style="color:#c62828">Invalid input. Try: 440 Hz, 120 BPM, or C#4+25c</span>';
        return;
    }

    roundActive = false;
    stopTone();

    /* Error in octaves (log₂ ratio) */
    const err = Math.log2(hz / currentFreq);
    guessData.push({
        freq: currentFreq,
        guessHz: hz,
        error: err,
    });

    document.getElementById("feedback").textContent = "";

    drawGraph();

    /* Disable guess controls, show Next button */
    inp.disabled = true;
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "";
    document.getElementById("nextBtn").focus();
}

/* ======================================================
   Graph – Canvas 2D scatter plot
   X = frequency (log scale)
   Y = error in octaves
   ====================================================== */
function drawGraph() {
    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const W = canvas.parentElement.clientWidth;

    const ml = 58,
        mr = 18,
        mt = 14,
        mb = 50;
    const pw = W - ml - mr;

    const xLo = Math.log2(MIN_FREQ);
    const xHi = Math.log2(MAX_FREQ);

    /* Fixed Y axis: ±1.5 octaves, divided into 12 semitones per octave */
    const yA = 1.5;
    const octavesX = xHi - xLo;
    const octavesY = 2 * yA;

    /* Enforce aspect ratio: 1 octave on Y = sqrt(12) × 1 octave on X */
    const pxPerOctX = pw / octavesX;
    const pxPerOctY = Math.sqrt(12) * pxPerOctX;
    const ph = Math.round(octavesY * pxPerOctY);
    const H = ph + mt + mb;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const xPx = (lf) =>
        ml + ((lf - xLo) / (xHi - xLo)) * pw;
    const yPx = (e) => mt + ((yA - e) / (2 * yA)) * ph;

    /* Background */
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(ml, mt, pw, ph);

    /* --- X grid lines at octaves of the reference A --- */
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    const refA = getRefA();
    const refALog2 = Math.log2(refA);
    for (let oct = Math.ceil(xLo - refALog2); oct <= Math.floor(xHi - refALog2); oct++) {
        const x = xPx(refALog2 + oct);
        if (x < ml || x > ml + pw) continue;
        ctx.beginPath();
        ctx.moveTo(x, mt);
        ctx.lineTo(x, mt + ph);
        ctx.stroke();
    }

    /* --- X labels at powers of 10 --- */
    ctx.font = "11px sans-serif";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#888";
    ctx.textAlign = "center";
    [1, 10, 100, 1000, 10000].forEach((f) => {
        const x = xPx(Math.log2(f));
        if (x < ml || x > ml + pw) return;
        const label =
            f >= 1000 ? f / 1000 + "k" : String(f);
        ctx.fillText(label + " Hz", x, mt + ph + 7);
    });

    /* --- Y grid (semitones: 12 divisions per octave) --- */
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let s = -18; s <= 18; s++) {
        const val = s / 12;
        const y = yPx(val);
        if (s === 0) {
            ctx.strokeStyle = "#aaa";
            ctx.lineWidth = 1.5;
        } else if (s % 12 === 0) {
            ctx.strokeStyle = "#ccc";
            ctx.lineWidth = 1;
        } else {
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 0.75;
        }
        ctx.beginPath();
        ctx.moveTo(ml, y);
        ctx.lineTo(ml + pw, y);
        ctx.stroke();

        /* Labels at 0, ±½, ±1, ±1½ */
        if (s === 0 || s === 6 || s === -6 || s === 12 || s === -12 || s === 18 || s === -18) {
            ctx.fillStyle = "#888";
            const lbl = s === 0 ? "0"
                : s === 6 ? "+½"
                : s === -6 ? "-½"
                : s === 12 ? "+1"
                : s === -12 ? "-1"
                : s === 18 ? "≥+1½"
                : "≤-1½";
            ctx.fillText(lbl, ml - 6, y);
        }
    }

    /* --- Axes --- */
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ml, mt);
    ctx.lineTo(ml, mt + ph);
    ctx.lineTo(ml + pw, mt + ph);
    ctx.stroke();

    /* --- Data points --- */
    ctx.fillStyle = "#2e7d32";
    for (const d of guessData) {
        const x = xPx(Math.log2(d.freq));
        const y = yPx(d.error);
        /* Clamp y to plot area so dots don't escape */
        const cy = Math.max(mt, Math.min(mt + ph, y));
        ctx.beginPath();
        ctx.arc(x, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
    }

    /* --- Axis labels --- */
    ctx.fillStyle = "#555";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Frequency", ml + pw / 2, H - 14);

    ctx.save();
    ctx.translate(13, mt + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = "top";
    ctx.fillText("Error (octaves)", 0, 0);
    ctx.restore();
}

/* ======================================================
   Initialisation & event wiring
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("toggleBtn")
        .addEventListener("click", toggleTone);
    document
        .getElementById("submitBtn")
        .addEventListener("click", submitGuess);
    document
        .getElementById("nextBtn")
        .addEventListener("click", nextRound);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (roundActive) submitGuess();
            else if (document.getElementById("nextBtn").style.display !== "none") nextRound();
        }
    });

    /* Volume hint: show on first hover, hide after 2s, never again */
    const hint = document.getElementById("volumeHint");
    const toggleBtn = document.getElementById("toggleBtn");
    function showHintOnce() {
        hint.classList.add("show");
        setTimeout(() => hint.classList.remove("show"), 2000);
        toggleBtn.removeEventListener("mouseenter", showHintOnce);
        toggleBtn.removeEventListener("click", showHintOnce);
    }
    toggleBtn.addEventListener("mouseenter", showHintOnce);
    toggleBtn.addEventListener("click", showHintOnce);

    /* Mobile-friendly tooltip toggle */
    document
        .getElementById("helpIcon")
        .addEventListener("click", function () {
            this.classList.toggle("show-tooltip");
        });

    nextRound();
    drawGraph();
    window.addEventListener("resize", drawGraph);
});