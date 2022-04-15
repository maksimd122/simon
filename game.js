var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel] && userClickedPattern.length <= gamePattern.length) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        $("body").unbind();
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").keydown(function () {
            $("body").unbind();
            level = 0;
            gamePattern = [];
            userClickedPattern = [];
            nextSequence();
        });
        $('body').on('swipeleft', function() {
            $("body").unbind();
            level = 0;
            gamePattern = [];
            userClickedPattern = [];
            nextSequence();
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
    $(".btn").click(function () {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
});

$('body').on('swipeleft', function() {
    $("body").unbind();
    nextSequence();
    $(".btn").click(function () {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
});