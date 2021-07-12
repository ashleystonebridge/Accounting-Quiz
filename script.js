// Selects element by class
var timeEl = document.getElementById("time");

// Selects element by id
var gameOverEl = document.getElementById("game-over");

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to display game over message
      endQuiz();
    }

  }, 1000);
}

// Function to send game over message
function endQuiz() {
  timeEl.textContent = " ";
  gameOverEl.textContent = "End of Quiz";

}

var startGame = document.getElementById("start-button");

var score = 0;

function beginGame() {
    score = 0;
    var startDisplay = document.getElementById("start");
    startDisplay.style.display = "none";
    setTime();
    askQuestions();
}

startGame.addEventListener("click", beginGame);

//store initials inputted and highscores via button increment, display on screen
var initials = document.getElementById("initialsSpan");
var initialsText = document.getElementById("initialsText");
var highscore = document.getElementById("highscoreSpan");
var newInitialButton = document.getElementById("newInitials");
var newHighscoreButton = document.getElementById("newHighscore");
var clearButton = document.getElementById("clear");

var currentInitials = localStorage.getItem("initialsText");
var currentHighscore = localStorage.getItem("highscore");

if (currentInitials === null) {
  currentInitials = "";
}

initials.textContent = currentInitials;
highscore.textContent = currentHighscore;

newInitialButton.addEventListener("click", function(){
  currentInitials = initialsText.value
  initials.textContent = currentInitials;
  localStorage.setItem("initialsText", currentInitials);
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

//question objects

var questions = [
  {
    question: "What does CPA stand for?",
    answers: ["A", "B", "Certified Public Accountant", "D"],
    correctAnswer: "Certified Public Accountant"
  },
  {
    question: "Who is Ashley?",
    answers: ["Ashley is an accountant", "B", "C", "D"],
    correctAnswer: "Ashley is an accountant"
  }
]

var buttonA = document.getElementById("buttonA");
var buttonB = document.getElementById("buttonB");
var buttonC = document.getElementById("buttonC");
var buttonD = document.getElementById("buttonD");
var questionText = document.getElementById("questionText")
var questionNumber = 0;

function askQuestions() {
  document.getElementById("correct").textContent = "";
  document.getElementById("incorrect").textContent = "";
  var question = questions[questionNumber];
  questionText.textContent = question.question;
  buttonA.textContent = question.answers[0];
  buttonB.textContent = question.answers[1];
  buttonC.textContent = question.answers[2];
  buttonD.textContent = question.answers[3];
}

function nextQuestion() {
  if (questionNumber < questions.length){
    questionNumber++;
    askQuestions();
  }else{
    endQuiz();
  }
}

function buttonClicked(index){
  var currentQuestion = questions[questionNumber];
  if (currentQuestion.answers[index] === currentQuestion.correctAnswer) {
    document.getElementById("correct").textContent = "Correct!";
    score++;
    document.getElementById("score").textContent = score;
  }else{
    document.getElementById("incorrect").textContent = "Incorrect!";
    secondsLeft -= 5;
  }
  setTimeout(nextQuestion, 1000)
}

buttonA.addEventListener("click", function(){
  buttonClicked(0);
})
buttonB.addEventListener("click", function(){
  buttonClicked(1);
})
buttonC.addEventListener("click", function(){
  buttonClicked(2);
})
buttonD.addEventListener("click", function(){
  buttonClicked(3);
})
