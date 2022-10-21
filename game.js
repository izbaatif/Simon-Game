var gamePattern = [];

var userClickedPattern = [];

var buttonColours =["red" , "blue" , "green" , "yellow"];

var level = 0;

var started = false;

	
 
 $(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});



$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1)
  
})

function playSound(name)
{
  var sound = new Audio ("sounds/" + name + ".mp3");

  sound.play();
}

function nextSequence()
{
  userClickedPattern = [];
  
  $("#level-title").text("Level " + level);
  level+=1;
  
  var randomNumber = Math.floor(Math.random()*4);
  
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed"); 
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
  {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    }
  
  else{
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function() {
          $("body").removeClass("game-over");
        }, 2000);
    $("#level-title").text("Game over! Press any key to restart.")
    started=false;
    startOver();
  }
}


function startOver()
{
  level = 0;
  started = false;
  gamePattern=[];
  userClickedPattern =[]
}