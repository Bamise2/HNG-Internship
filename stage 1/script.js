
const targetColor = document.querySelector(".targetColor");
const colorOption = document.querySelectorAll('[data-testid="colorOption"]');
const scoreTrack = document.querySelector('[data-testid="score"]');
const statusElement = document.querySelector('[data-testid="gameStatus"]');
const newGameBtn = document.querySelector('[data-testid="newGameButton"]');

let score = 0;


const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#800000", "#008080", "#000080"
];



function getRandomColor(){
    return colors[Math.floor(Math.random() * colors.length)]
}






function newGame() {
    const target = getRandomColor();
    targetColor.style.backgroundColor = target;

    // Create a set of unique colors excluding the target
    const uniqueColors = new Set(colors);
    uniqueColors.delete(target);

    // Convert the set back to an array and shuffle
    const availableColors = Array.from(uniqueColors).sort(() => Math.random() - 0.5);

    let randomIndex = Math.floor(Math.random() * colorOption.length);
    for (let i = 0, j = 0; i < colorOption.length; i++) {
        if (i === randomIndex) {
            colorOption[i].style.backgroundColor = target;
        } else {
            colorOption[i].style.backgroundColor = availableColors[j];
            j++;
        }
    }
}



function handleGuess(e) {
    let clickedColor = e.target.style.backgroundColor;
    let targetColorValue = targetColor.style.backgroundColor;

    if (clickedColor === targetColorValue) {
        score += 10;
        statusElement.innerHTML = "Correct";
        statusElement.classList.remove("wrong");
        statusElement.classList.add("correct");
        statusElement.classList.add("correctAnimation");

        scoreTrack.classList.remove("scoreDecrease");
        scoreTrack.classList.add("scoreIncrease");

    } else {
        score = Math.max(0, score - 5); // Prevent negative scores
        statusElement.innerHTML = "Wrong";
        statusElement.classList.remove("correct");
        statusElement.classList.add("wrong");
        statusElement.classList.add("wrongAnimation");

        scoreTrack.classList.remove("scoreIncrease");
        scoreTrack.classList.add("scoreDecrease");
    }

    // Update main score display
    scoreTrack.innerHTML = score;

    statusElement.addEventListener("animationend", () => {
        statusElement.classList.remove("correctAnimation", "wrongAnimation");
    });
    newGame();
}



// Attach event listeners
colorOption.forEach(option => {
    option.addEventListener("click", handleGuess);
});






newGameBtn.addEventListener("click", ()=>{
    score = 0;
    statusElement.innerHTML = "Take a Guess"
    newGame();
    scoreTrack.innerHTML = score;
    statusElement.classList.remove("wrong");
    statusElement.classList.remove("correct");
    scoreTrack.classList.remove("scoreDecrease");
    scoreTrack.classList.remove("scoreIncrease");
})

window.onload = newGame


