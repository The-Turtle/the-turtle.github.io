// Constants
const GAME_DURATION_SECONDS = 60;
const SKIP_PENALTY_SECONDS = 3;
const FEEDBACK_DURATION_SECONDS = 2;
const GUESS_LOCK_SECONDS = 0.1;

// Page elements
const guessInput = document.getElementById("guess");
const suggestionsList = document.getElementById("suggestions");
const feedback = document.getElementById("feedback");
const startButton = document.getElementById("startButton");
const skipButton = document.getElementById("skipButton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const instructions = document.getElementById("instructions");
const scoreShare = document.getElementById("scoreShare");
const scoreShareButton = document.getElementById("scoreShareButton");
const audioA = document.getElementById("songA");
const audioB = document.getElementById("songB");

// State
let playlist;
let folderPath;
let songs;

let score = 0;
let skippedCount = 0;
let secondsRemaining;
let gameTimer;
let feedbackTimer;
let penaltyTimer;
let guessLockTimer;
let copyReportTimer;
let penaltyActive = false;
let guessLocked = false;
let scoreReport;
let songStartedAt;

const playerA = { audio: audioA, song: null };
const playerB = { audio: audioB, song: null };
let activePlayer = playerB;
let queuedPlayer = playerA;

let recentSongs = [];

// Game flow
function selectPlaylist(id) {
  document.getElementById("playlistSelector").style.display = "none";
  document.getElementById("gameContent").style.display = "block";
  document.getElementById("backButton").style.display = "block";
  playlist = playlists.find((playlist) => playlist.id === id);
  folderPath = playlist.folderPath;
  songs = playlist.songs;
  document.getElementById("leftPortrait").src = playlist.leftImagePath;
  document.getElementById("rightPortrait").src = playlist.rightImagePath;
  timerDisplay.textContent = GAME_DURATION_SECONDS;
  scoreDisplay.textContent = score;
  instructions.textContent =
    `Name as many ${playlist.name} as you can in ${GAME_DURATION_SECONDS} seconds!`;
  initializeSongs();
}

function startGame() {
  secondsRemaining = GAME_DURATION_SECONDS;
  score = 0;
  skippedCount = 0;
  timerDisplay.textContent = secondsRemaining;
  scoreDisplay.textContent = score;
  startButton.textContent = "Restart";
  skipButton.disabled = false;
  guessInput.disabled = false;
  guessInput.placeholder = "your answer here";
  feedback.textContent = "";
  instructions.textContent = "";
  scoreShare.style.display = "none";
  resetTimers();
  startGameTimer();
  scoreReport = "";
  playNextSong();
}

function playNextSong() {
  // Play the queued song, then use the other player to preload the next one.
  const previousPlayer = activePlayer;
  activePlayer = queuedPlayer;
  queuedPlayer = previousPlayer;
  queuedPlayer.audio.pause();
  activePlayer.audio.muted = false;
  preloadSong(queuedPlayer);

  songStartedAt = Date.now();
  guessInput.value = "";
  suggestionsList.innerHTML = "";
}

function checkGuess(showIncorrectFeedback = false) {
  if (guessLocked) return;
  const userGuess = guessInput.value;
  const answer = findMatchingAnswer(userGuess, activePlayer.song.answers);
  if (answer) {
    feedback.innerHTML = `<em>${answer}</em> is correct!`;
    feedback.style.color = "white";
    scoreReport +=
      "✅ (" + elapsedSongSeconds() + "s) " + correctAnswer() + "\n";
    score++;
    scoreDisplay.textContent = score;
    resetFeedbackTimer();
    playNextSong();
  } else if (showIncorrectFeedback) {
    guessInput.value = "";
    feedback.innerHTML = `<em>${userGuess}</em> is incorrect`;
    feedback.style.color = "red";
    scoreReport += "❌";
    resetFeedbackTimer();
    resetGuessLockTimer();
  }
}

function skipSong() {
  skippedCount++;
  scoreReport +=
    "⏭️ (" + elapsedSongSeconds() + "s) " + correctAnswer() + "\n";
  skipButton.disabled = true;
  guessInput.disabled = true;
  suggestionsList.innerHTML = "";
  feedback.innerHTML =
    `the correct answer was <em>${correctAnswer()}</em>`;
  clearTimeout(feedbackTimer);
  let countdown = SKIP_PENALTY_SECONDS;
  penaltyActive = true;
  guessInput.placeholder = `Next song in ${countdown}...`;
  penaltyTimer = setInterval(() => {
    countdown--;
    guessInput.placeholder = `Next song in ${countdown}...`;
    if (countdown <= 0) {
      clearInterval(penaltyTimer);
      penaltyActive = false;
      guessInput.disabled = false;
      skipButton.disabled = false;
      guessInput.placeholder = "your answer here";
      feedback.textContent = "";
      playNextSong();
    }
  }, 1000);
}

function endGame() {
  feedback.innerHTML = `The correct answer was <em>${correctAnswer()}</em><br><br>` +
    `Game over! You identified ${score} ${score === 1 ? playlist.nameSingular : playlist.name} (${skippedCount} skipped)`;
  feedback.style.color = "white";
  playerA.audio.pause();
  playerB.audio.pause();
  startButton.textContent = "Play again";
  skipButton.disabled = true;
  guessInput.disabled = true;
  guessInput.value = "";
  guessInput.placeholder = "press 'Play again'";
  suggestionsList.innerHTML = "";
  scoreShare.style.display = "block";
  scoreShareButton.textContent = "Share your score!";
  scoreShareButton.disabled = false;
  const spaceIfNeeded = scoreReport.endsWith("\n") ? "" : " ";
  if (!penaltyActive) {
    scoreReport += `${spaceIfNeeded}(${elapsedSongSeconds()}s) ${correctAnswer()}\n`;
  }
  scoreReport = `Music Guesser (tinyurl.com/musicguesser)\n${scoreReport}`.trim();
  scoreReport += `\nScore: ${score}/${score + skippedCount} ${playlist.name}`;
  resetTimers();
  initializeSongs();
}

// Supporting functions
function initializeSongs() {
  activePlayer = playerB;
  queuedPlayer = playerA;
  activePlayer.song = null;
  preloadSong(queuedPlayer);
}

function preloadSong(player) {
  player.song = pickRandomSong();
  const audio = player.audio;
  audio.querySelector("source").src = folderPath + player.song.file;
  audio.onloadedmetadata = () => {
    audio.currentTime = Math.random() * audio.duration;
    audio.play();
  };
  audio.onended = () => {
    audio.currentTime = 0;
    audio.play();
  };
  audio.muted = true;
  audio.load();
}

function pickRandomSong() {
  let song;
  do {
    song = songs[Math.floor(Math.random() * songs.length)];
  } while (recentSongs.includes(song.answers[0]));
  recentSongs.push(song.answers[0]);
  if (recentSongs.length > Math.floor(songs.length / 2)) {
    recentSongs.shift();
  }
  return song;
}

function resetTimers() {
  clearInterval(gameTimer);
  clearInterval(penaltyTimer);
  clearTimeout(feedbackTimer);
  clearTimeout(guessLockTimer);
  clearTimeout(copyReportTimer);
  penaltyActive = false;
  guessLocked = false;
}

function startGameTimer() {
  gameTimer = setInterval(() => {
    secondsRemaining--;
    timerDisplay.textContent = secondsRemaining;
    document.getElementById("seconds-label").textContent =
      secondsRemaining !== 1 ? "seconds" : "second";
    if (secondsRemaining <= 0) {
      endGame();
    }
  }, 1000);
}

function elapsedSongSeconds() {
  const seconds = (Date.now() - songStartedAt) / 1000;
  return seconds.toFixed(1);
}

function resetFeedbackTimer() {
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    feedback.textContent = "";
  }, FEEDBACK_DURATION_SECONDS * 1000);
}

function resetGuessLockTimer() {
  guessLocked = true;
  clearTimeout(guessLockTimer);
  guessLockTimer = setTimeout(() => {
    guessLocked = false;
  }, GUESS_LOCK_SECONDS * 1000);
}

function correctAnswer() {
  return activePlayer.song.answers[0];
}

function normalizeAnswer(input) {
  return input
    .toLowerCase()
    .replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()']/g, "")
    .trim();
}

function findMatchingAnswer(userGuess, correctAnswers) {
  const guess = normalizeAnswer(userGuess);
  for (const answer of correctAnswers) {
    if (guess === normalizeAnswer(answer)) {
      return answer;
    }
  }
  return false;
}

function isNonContiguousSubstring(sub, str) {
  let subIndex = 0;
  for (let char of str) {
    if (char.toLowerCase() === sub[subIndex].toLowerCase()) {
      subIndex++;
    }
    if (subIndex === sub.length) {
      return true;
    }
  }
  return false;
}

function getSuggestions(input) {
  if (input.trim() === "") return [];
  const priorityAnswers = new Set();
  const matchingAnswers = new Set();
  const nonContiguousAnswers = new Set();
  const normalizedInput = normalizeAnswer(input);
  songs.forEach((song) => {
    song.answers.forEach((answer) => {
      if (normalizeAnswer(answer).startsWith(normalizedInput)) {
        priorityAnswers.add(song.answers[0]);
      }
    });
    [...song.answers, ...song.keywords].forEach((answer) => {
      if (normalizeAnswer(answer).includes(normalizedInput)) {
        matchingAnswers.add(song.answers[0]);
      } else if (isNonContiguousSubstring(normalizedInput, normalizeAnswer(answer))) {
        nonContiguousAnswers.add(song.answers[0]);
      }
    });
  });
  priorityAnswers.forEach((answer) => {
    matchingAnswers.delete(answer);
    nonContiguousAnswers.delete(answer);
  });
  matchingAnswers.forEach((answer) => {
    nonContiguousAnswers.delete(answer);
  });
  const priorityAnswersSorted = [...priorityAnswers].sort();
  const matchingAnswersSorted = [...matchingAnswers].sort();
  const nonContiguousAnswersSorted = [...nonContiguousAnswers].sort();
  return [
    ...priorityAnswersSorted,
    ...matchingAnswersSorted,
    ...nonContiguousAnswersSorted,
  ];
}

function updateSuggestions() {
  suggestionsList.innerHTML = "";
  const suggestions = getSuggestions(guessInput.value);
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("li");
    suggestionElement.textContent = suggestion;
    suggestionsList.appendChild(suggestionElement);
  });
}

function changeScoreShareText(text) {
  scoreShareButton.textContent = text;
  clearTimeout(copyReportTimer);
  scoreShareButton.disabled = true;
  copyReportTimer = setTimeout(() => {
    scoreShareButton.textContent = "Share your score!";
    scoreShareButton.disabled = false;
  }, 2000);
}

function copyReportToClipboard() {
  navigator.clipboard
    .writeText(scoreReport)
    .then(() => {
      changeScoreShareText("Score copied to clipboard");
    })
    .catch(() => {
      changeScoreShareText("error: could not copy score");
    });
}

// Events
document.querySelectorAll('[data-playlist]').forEach((button) => {
  button.addEventListener('click', () => selectPlaylist(button.dataset.playlist));
});
startButton.addEventListener('click', startGame);
skipButton.addEventListener('click', skipSong);
scoreShareButton.addEventListener('click', copyReportToClipboard);

guessInput.addEventListener('input', () => {
  updateSuggestions();
  checkGuess();
});
guessInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' || guessInput.value.trim() === '') return;
  if (suggestionsList.firstChild) {
    guessInput.value = suggestionsList.firstChild.textContent;
  }
  checkGuess(true);
  suggestionsList.replaceChildren();
});
suggestionsList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    guessInput.value = event.target.textContent;
    suggestionsList.replaceChildren();
    checkGuess(true);
  }
});
