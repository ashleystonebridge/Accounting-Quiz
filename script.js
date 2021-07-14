var timeEl = document.getElementById("time");
var gameOverEl = document.getElementById("game-over");
var secondsLeft = 0;
var timerInterval = null;

function startScreen() {
  document.getElementById("initialsBox").style.display = "none";
  document.getElementById("highscoreBox").style.display = "none";
  document.getElementById("questionBox").style.display = "none";
  document.getElementById("goBackBox").style.display = "none";
  document.getElementById("start").style.display = "block"
  document.getElementById("score").textContent = 0;
  gameOverEl.style.display = "none";
}

startScreen();

var startGame = document.getElementById("start-button");
var score = 0;

function beginGame() {
    score = 0;
    timeEl.textContent = 30;
    secondsLeft = 30;
    var startDisplay = document.getElementById("start");
    startDisplay.style.display = "none";
    document.getElementById("questionBox").style.display = "block";
    questionNumber = 0;
    setTime();
    askQuestions();
}

startGame.addEventListener("click", beginGame);

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft <= 0) {
      // Calls function to display game over message
      endQuiz();
    }

  }, 1000);
}

// Function to send game over message
function endQuiz() {
  clearInterval(timerInterval);
  timeEl.textContent = 0;
  gameOverEl.textContent = "End of Quiz";
  document.getElementById("initialsBox").style.display = "block";
  document.getElementById("highscoreBox").style.display = "block";
  document.getElementById("goBackBox").style.display = "block";
  document.getElementById("questionBox").style.display = "none";
}

var goBackButton = document.getElementById("goBack");
goBackButton.addEventListener("click", startScreen);

//store initials inputted and highscores via buttons, display on screen
var initials = document.getElementById("initialsSpan");
var initialsText = document.getElementById("initialsText");
var highscore = document.getElementById("highscoreSpan");
var newInitialButton = document.getElementById("newInitials");
var newHighscoreButton = document.getElementById("newHighscore");
var clearButton = document.getElementById("clear");

var currentInitials = localStorage.getItem("initialsText");
var currentHighscore = localStorage.getItem("highscoreSpan");

if (currentInitials === null) {
  currentInitials = "";
}

if (currentHighscore === null) {
  currentHighscore = "";
}

initials.textContent = currentInitials;
highscore.textContent = currentHighscore;

newInitialButton.addEventListener("click", function(){
  currentInitials = initialsText.value;
  initials.textContent = currentInitials;
  localStorage.setItem("initialsText", currentInitials);
});

newHighscoreButton.addEventListener("click", function(){
  currentHighscore = score;
  highscore.textContent = currentHighscore;
  localStorage.setItem("highscoreSpan", currentHighscore);
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
  },
  {
    question: "How do you book a cash receipt?",
    answers: ["A", "B", "Credit AR, Debit Cash", "D"],
    correctAnswer: "Credit AR, Debit Cash"
  },
  {
    question: "How many hours of CPEs does a CPA need to do every 3 years?",
    answers: ["A", "B", "C", "120"],
    correctAnswer: "120"
  },
  {
    question: "What is the slogan for being an accountant?",
    answers: ["A", "Be audit you can be", "C", "D"],
    correctAnswer: "Be audit you can be"
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
  if (questionNumber < questions.length -1){
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
