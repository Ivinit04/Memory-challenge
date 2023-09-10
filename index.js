
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];            //stores the colour that randomly got selected. 
var userClickedPattern = [];     //stores the colour that got clicked by user.
var level = 0;
var gameStart = false;

$(document).keypress(function(){
    if(!gameStart){
        gameStart=true;
        nextSequence();
    }
    
});


$(".btn").click(function(event){             //for the button that user click's.
    // console.log(event.target.id);  

    var userChosenColour = event.target.id;        //stores the id of button that got pressed.
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});



function nextSequence(){

    level++;
    $("h1").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);      // Animate a flash to a random coloured button.

    playSound(randomChosenColour);                 // plays sound for colour selected.
                                            
    

}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");   
    audio.play();   
}

function animatePress(currentColour) {  
    $("#"+currentColour).addClass("pressed");       
    
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(index){
    // console.log(userClickedPattern);
    // console.log(gamePattern);
    // console.log(currentLevel1);

    if(userClickedPattern[index] === gamePattern[index]){

        if(userClickedPattern.length === gamePattern.length){
            // console.log("success");
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
        
    }else{
        // console.log("fail");
        playSound("wrong");   

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },200);    

        $("h1").text("Game Over, Press Any Key to Restart");

        //to restart the game
        gameStart = false;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
    }
}



