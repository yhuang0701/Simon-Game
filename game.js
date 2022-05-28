var levelNum = 0;

var gameStarted = false;

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

function startAnimation() {
  $("#level-title").hide();
  $("#game-title").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#game-title").slideUp();
  $("#level-title").show();
}

startAnimation();

$(document).keydown(function() {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level " + levelNum);
    nextSequence();
  }
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// randomly generate the next sequence number from 0-3
function nextSequence() {
  levelNum++;
  $("#level-title").text("Level " + levelNum);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  // reset user clicked inputs in every round
  userClickedPattern = [];
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  var delayInMilliseconds = 100;
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, delayInMilliseconds);
}


$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);

  animatePress(userChosenColor);

  playSound(userChosenColor);

  checkUserAnswer(userClickedPattern.length - 1);

});

function checkUserAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {

    playSound("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);


    startOver();

  }
}

function startOver() {
  levelNum = 0;
  gamePattern = [];
  gameStarted = false;
}
