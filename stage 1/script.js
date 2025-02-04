// DOM Elements
const targetColor = document.querySelector(".targetColor");
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const scoreTrack = document.querySelector('[data-testid="score"]');
const statusElement = document.querySelector('[data-testid="gameStatus"]');
const newGameBtn = document.querySelector('[data-testid="newGameButton"]');

// Game State
let score = 0;
const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#800000", "#008080", "#000080"
];

// Utility Functions
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const updateStatus = (message, isCorrect) => {
  statusElement.textContent = message;
  statusElement.classList.toggle("correct", isCorrect);
  statusElement.classList.toggle("wrong", !isCorrect);
  statusElement.classList.add(isCorrect ? "correctAnimation" : "wrongAnimation");
  statusElement.classList.add(isCorrect ? "scoreIncreaseAnimation" : "scoreDecreaseAnimation");

  scoreTrack.classList.toggle("scoreIncrease", isCorrect);
  scoreTrack.classList.toggle("scoreDecrease", !isCorrect);

  statusElement.addEventListener("animationend", () => {
    statusElement.classList.remove("correctAnimation", "wrongAnimation", "scoreIncreaseAnimation", "scoreDecreaseAnimation");
  });
};

const updateScore = (points) => {
  score = Math.max(0, score + points);
  scoreTrack.textContent = score;
};

// Game Logic
const newGame = () => {
  const target = getRandomColor();
  targetColor.style.backgroundColor = target;

  // Generate unique color options
  const availableColors = colors.filter(color => color !== target).sort(() => Math.random() - 0.5);
  const correctIndex = Math.floor(Math.random() * colorOptions.length);

  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = index === correctIndex ? target : availableColors[index];
  });
};

const handleGuess = (e) => {
  const guessedColor = e.target.style.backgroundColor;
  const targetColorValue = targetColor.style.backgroundColor;

  if (guessedColor === targetColorValue) {
    updateScore(10);
    updateStatus("Correct!", true);
  } else {
    updateScore(-5);
    updateStatus("Wrong!", false);
  }

  newGame();
};

// Event Listeners
colorOptions.forEach(option => option.addEventListener("click", handleGuess));

newGameBtn.addEventListener("click", () => {
  score = 0;
  scoreTrack.textContent = score;
  statusElement.textContent = "Take a Guess";
  statusElement.classList.remove("wrong", "correct");
  scoreTrack.classList.remove("scoreDecrease", "scoreIncrease");
  newGame();
});

// Initialize Game
window.onload = newGame;
