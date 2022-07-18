
let gamePattern = [];
let userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];
let noOfTimes = [];

let Level = 0;

// Get the button thatw as clicked and append it to userClickedPattern array
$(".btn").click(function(event){
    let userChosenColour = event.target.classList[1];
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    setTimeout(function(){ $("#" + userChosenColour).removeClass("pressed")}, 100);
    checkAnswer(userClickedPattern.length - 1);
});

// Need to detect when a keyboard key is pressed

$("body").keydown(function(event){
    // create an empty list an store if the event is the first time a key is pressed
    if(noOfTimes.length < 1){
        noOfTimes.push(event.key);
        $("h1").text("Level: " + Level);
        nextSequence();  
    } 
   
});

// Function to check answer

function checkAnswer(currentLevel){
    if((gamePattern[currentLevel]) === (userClickedPattern[currentLevel])){
        console.log("sucess")

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){nextSequence()}, 1000);
            console.log(gamePattern);
        }
        
    } else{
        console.log("wrong")
        audio = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key To Start Over");
        startOver();
    }

};

function startOver(){
    gamePattern = [];
    Level = 0;
    noOfTimes = [];
}


function nextSequence() {

    userClickedPattern = [];
    //Increment Level
    Level++

    $("h1").text("Level: "+ Level);
    // Generate a number between 0 and 3
    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    console.log(gamePattern)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


};




// Function to play sound
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
};

//Function to add pressed class to buttons
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
};

//;






