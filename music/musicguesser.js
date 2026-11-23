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
const playerA = document.getElementById("songA");
const playerB = document.getElementById("songB");

let playlist;
let folderPath;
let songs;

const totalTime = 60;
const penaltyTime = 3;
const feedbackTime = 2;
const lockedTime = 0.1;
let score = 0;
let skippedCounter = 0;
let currentSong;
let gameTimeLeft;
let gameTimer;
let feedbackTimer;
let penaltyTimer;
let guessLockTimer;
let copyReportTimer;
let penaltyActive = false;
let locked = false;
let outputString;
let questionTimeStart;

let songA;
let songB;
let currentSongPlayer;

let recentSongs = [];

function initializeSongs() {
  songA = loadSong(playerA);
  songB = null;
  currentSong = songA;
  currentSongPlayer = "B";
}

function loadGame(id) {
  document.getElementById("playlistSelector").style.display = "none";
  document.getElementById("gameContent").style.display = "block";
  document.getElementById("backButton").style.display = "block";
  playlist = playlists.find((playlist) => playlist.id === id);
  folderPath = playlist.folderPath;
  songs = playlist.songs;
  document.getElementById("leftPortrait").src = playlist.leftImagePath;
  document.getElementById("rightPortrait").src = playlist.rightImagePath;
  timerDisplay.textContent = totalTime;
  scoreDisplay.textContent = score;
  instructions.textContent =
    `Name as many ${playlist.name} as you can in ${totalTime} seconds!`;
  initializeSongs();
}

function randomSong() {
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
  locked = false;
}

function startGame() {
  gameTimeLeft = totalTime;
  score = 0;
  skippedCounter = 0;
  timerDisplay.textContent = gameTimeLeft;
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
  outputString = "";
  playNextSong();
}

function loadSong(audio) {
  const song = randomSong();
  audio.querySelector("source").src = folderPath + song.file;
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
  return song;
}

function playNextSong() {
  currentSongPlayer = currentSongPlayer === "A" ? "B" : "A";
  if (currentSongPlayer === "A") {
    currentSong = songA;
    playerB.pause();
    playerA.muted = false;
    songB = loadSong(playerB);
  } else {
    currentSong = songB;
    playerA.pause();
    playerB.muted = false;
    songA = loadSong(playerA);
  }
  questionTimeStart = Date.now();
  guessInput.value = "";
  suggestionsList.innerHTML = "";
}

function questionTimeElapsed() {
  const seconds = (Date.now() - questionTimeStart) / 1000;
  return seconds.toFixed(1);
}

function startGameTimer() {
  gameTimer = setInterval(() => {
    gameTimeLeft--;
    timerDisplay.textContent = gameTimeLeft;
    document.getElementById("seconds-label").textContent =
      gameTimeLeft !== 1 ? "seconds" : "second";
    if (gameTimeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function sanitizeInput(input) {
  return input
    .toLowerCase()
    .replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()']/g, "")
    .trim();
}

function match(userGuess, correctAnswers) {
  const guess = sanitizeInput(userGuess);
  for (const answer of correctAnswers) {
    if (guess === sanitizeInput(answer)) {
      return answer;
    }
  }
  return false;
}

function resetFeedbackTimer() {
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    feedback.textContent = "";
  }, feedbackTime * 1000);
}

function resetGuessLockTimer() {
  locked = true;
  clearTimeout(guessLockTimer);
  guessLockTimer = setTimeout(() => {
    locked = false;
  }, lockedTime * 1000);
}

function checkGuess(incorrectFeedback = false) {
  if (locked) return;
  const userGuess = guessInput.value;
  const answer = match(userGuess, currentSong.answers);
  if (answer) {
    feedback.innerHTML = `<em>${answer}</em> is correct!`;
    feedback.style.color = "white";
    outputString +=
      "✅ (" + questionTimeElapsed() + "s) " + correctAnswer() + "\n";
    score++;
    scoreDisplay.textContent = score;
    resetFeedbackTimer();
    playNextSong();
  } else if (incorrectFeedback) {
    guessInput.value = "";
    feedback.innerHTML = `<em>${userGuess}</em> is incorrect`;
    feedback.style.color = "red";
    outputString += "❌";
    resetFeedbackTimer();
    resetGuessLockTimer();
  }
}

function correctAnswer() {
  return currentSong.answers[0];
}

function skipSong() {
  skippedCounter++;
  outputString +=
    "⏭️ (" + questionTimeElapsed() + "s) " + correctAnswer() + "\n";
  skipButton.disabled = true;
  guessInput.disabled = true;
  suggestionsList.innerHTML = "";
  feedback.innerHTML =
    `the correct answer was <em>${correctAnswer()}</em>`;
  clearTimeout(feedbackTimer);
  let countdown = penaltyTime;
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
  const lowerInput = sanitizeInput(input);
  songs.forEach((song) => {
    song.answers.forEach((answer) => {
      if (sanitizeInput(answer).startsWith(lowerInput)) {
        priorityAnswers.add(song.answers[0]);
      }
    });
    [...song.answers, ...song.keywords].forEach((answer) => {
      if (sanitizeInput(answer).includes(lowerInput)) {
        matchingAnswers.add(song.answers[0]);
      } else if (isNonContiguousSubstring(lowerInput, sanitizeInput(answer))) {
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

function endGame() {
  feedback.innerHTML = `The correct answer was <em>${correctAnswer()}</em><br><br>` +
    `Game over! You identified ${score} ${score === 1 ? playlist.nameSingular : playlist.name} (${skippedCounter} skipped)`;
  feedback.style.color = "white";
  playerA.pause();
  playerB.pause();
  startButton.textContent = "Play again";
  skipButton.disabled = true;
  guessInput.disabled = true;
  guessInput.value = "";
  guessInput.placeholder = "press 'Play again'";
  suggestionsList.innerHTML = "";
  scoreShare.style.display = "block";
  scoreShareButton.textContent = "Share your score!";
  scoreShareButton.disabled = false;
  const spaceIfNeeded = outputString.endsWith("\n") ? "" : " ";
  if (!penaltyActive) {
    outputString += `${spaceIfNeeded}(${questionTimeElapsed()}s) ${correctAnswer()}\n`;
  }
  outputString = `Music Guesser (tinyurl.com/musicguesser)\n${outputString}`.trim();
  outputString += `\nScore: ${score}/${score + skippedCounter} ${playlist.name}`;
  resetTimers();
  initializeSongs();
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
    .writeText(outputString)
    .then(() => {
      changeScoreShareText("Score copied to clipboard");
    })
    .catch(() => {
      changeScoreShareText("error: could not copy score");
    });
}

document.querySelectorAll('[data-playlist]').forEach((button) => {
  button.addEventListener('click', () => loadGame(button.dataset.playlist));
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
