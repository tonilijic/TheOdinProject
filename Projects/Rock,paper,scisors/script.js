// Variables

let computerScore = 0;
let humanScore = 0;
let humanChoice = "";
let computerChoice = "";


// DOM Elements
const humanScoreElement = document.querySelector('.humanScore');
const computerScoreElement = document.querySelector('.computerScore');

const buttonScissors = document.querySelector(".buttonScisors");
const buttonRock = document.querySelector(".buttonRock");
const buttonPaper = document.querySelector(".buttonPaper");


// Event Listeners

buttonPaper.addEventListener('click', () => handleButtonClick("paper"));
buttonRock.addEventListener('click', () => handleButtonClick("rock"));
buttonScissors.addEventListener('click', () => handleButtonClick("scissors"));


// Functions

function getComputerChoice() {
    const choices = ["rock", "paper", "scisors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function updateScores() {
    humanScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
}

function checkGameEnd() {
    if (humanScore === 5) {
            alert(`Game over, the winner is Human with score ${humanScore} to ${computerScore}`);
        } else if (computerScore === 5) {
            alert(`Game over, the winner is Computer with score ${computerScore} to ${humanScore}`);
        }
}



function handleButtonClick(choice) {
    humanChoice = choice;
    console.log("Human choice:", humanChoice);
    handleChoice(choice);
}


function resetGame() {
    humanScore = 0;
    computerScore = 0;
    updateScores();
}



// Game logic

function handleChoice(humanChoice){
computerChoice = getComputerChoice();

        if (humanChoice === computerChoice) {
            alert("Draw, repeat");

        } else {
            if (humanChoice === "paper" && computerChoice === "rock") {
                humanScore++;
            } else if (humanChoice === "scissors" && computerChoice === "paper") {
                humanScore++;
            } else if (humanChoice === "rock" && computerChoice === "scissors") {
                humanScore++;
            } else {
                computerScore++;
            }
            updateScores();
            checkGameEnd();
        }

        
    }