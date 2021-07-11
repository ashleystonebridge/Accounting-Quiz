// Selects element by class
var timeEl = document.getElementById("time");

// Selects element by id
var gameOverEl = document.getElementById("game-over");

var secondsLeft = 10;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}

// Function to send game over message
function sendMessage() {
  timeEl.textContent = " ";
  gameOverEl.textContent = "Game Over";

}

var startGame = document.getElementById("start-button");

function beginGame() {
    var startDisplay = document.getElementById("start");
    startDisplay.style.display = "none";
    setTime();
}

startGame.addEventListener("click", beginGame);

//store initials and highscores
var initials = document.getElementById("initialsSpan");
var highscore = document.getElementById("highscoreSpan");
var newInitialButton = document.getElementById("newInitials");
var newHighscoreButton = document.getElementById("newHighscore");
var clearButton = document.getElementById("clear");

var currentInitials = localStorage.getItem("initials");
var currentHighscore = localStorage.getItem("highscore");

if (currentInitials === null) {
  currentInitials = "";
}

initials.textContent = currentInitials;
highscore.textContent = currentHighscore;

newInitialButton.addEventListener("click", function(){
  currentInitials = currentInitials + "A";
  initials.textContent = currentInitials;
  localStorage.setItem("initials", currentInitials);
});

newHighscoreButton.addEventListener("click", function(){
  currentHighscore = currentHighscore + 1;
  highscore.textContent = currentHighscore;
  localStorage.setItem("highscore", currentHighscore);
});

clearButton.addEventListener("click", function(){
  initials.textContent = "";
  highscore.textContent = "";
  currentInitials = "";
  currentHighscore = "";
  localStorage.clear();
});