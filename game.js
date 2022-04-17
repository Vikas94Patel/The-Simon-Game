var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// a new variable called level and start at level 0.
var level = 0;

$('.start-btn').click(function (event) {
    if (!started) {

        $("#level-title").text("Level : " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");  
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // check Answer after a user has clicked and chosen their answer
    checkAnswer(userClickedPattern.length-1);
});

// functtion to check answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {

        console.log("wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Click start to play again! Your score is : " + (level-1));
        // calling startOver() if the user gets the sequence wrong.
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    // increasing the level by 1 every time nextSequence() is called
    level++;
    $("#level-title").text("Level : " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flashing the choosen color
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(100);
    // playing sound while flashing
    playSound(randomChosenColour);
}

function playSound(name){
    // Adding audio
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 200);
}

// a new function to startOver.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}