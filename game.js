var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = true;

function clickEvent() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

function resetGame() {
    started = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel] && started === true) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        started = false;
        $("body").unbind();
        $(".restart").unbind();
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart or Press Start on Phone");
        $("body").keydown(function () {
            $("body").unbind();
            resetGame();
        });
        $('.restart').bind("click", function () {
            $(".restart").unbind();
            resetGame();
        });
    }
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).toggleClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).toggleClass("pressed");
    }, 100);
}

function nextSequence() {
    level += 1;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

$("body").keydown(function () {
    $("body").unbind();
    nextSequence();
    $(".btn").click(clickEvent);
});

$('.restart').bind("click", function () {
    $(".restart").unbind();
    nextSequence();
    $(".btn").click(clickEvent);
});