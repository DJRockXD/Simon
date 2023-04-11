//Start
$(document).keypress(start);

function start() {
  $(document).off("keypress");

  moves = [];
  move_counter = 0;
  lvl = 0;
  updateLevelAndMoves();
  $(".btn").click(clck);
}

// Updates the title Level and adds a new move. Resets counter.
function updateLevelAndMoves() {
  var ran = Math.floor(Math.random()*4+1);
  switch (ran) {
    case 1:
      ran = "yellow";
      break;
    case 2:
      ran = "red";
      break;
    case 3:
      ran = "blue";
      break;
    case 4:
      ran = "green";
      break;
  }
  moves.push(ran);   //Add new move.
  move_counter *= 0; //Reset counter.
  lvl++;             // Raise level.
  $(".title").html("Level " + lvl);
  console.log("New move: " + ran);
  //Show player next move.
  $("#"+ran).fadeOut().fadeIn();
}


// Animation, Sound, Answer-checking.
function clck() {

  // Animation
  var btn_clr = $(this).attr("id"); //Button Color
  //Switch classes
  $(this).toggleClass(btn_clr).toggleClass("pressed");
  setTimeout(()=>{ $(this).toggleClass(btn_clr).toggleClass("pressed"); }, 150);

  // Check Answer + Sound + Level cleared?
  console.log("Required move: " + moves[move_counter]);
  console.log("Actual move: " + btn_clr);

  if (btn_clr === moves[move_counter]) { //Correct play!
    var audio = new Audio("sounds/" + btn_clr + ".mp3");
    audio.play();
    move_counter++;
    console.log("Correct!");
  }
  else { //Wrong
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    gameOver();
  }
  if (move_counter === lvl) { //Level cleared!
    console.log("Level cleared!");
    updateLevelAndMoves();
  }
}


// GAME OVER message + strips clicking listener + re-places keypress listener
function gameOver() {
  $(".title").html("GAME OVER");
  $("body").addClass("gameOverBody");
  setTimeout(()=>{ $(".title").html("Press any key to restart"); }, 1000);
  setTimeout(()=>{ $("body").removeClass("gameOverBody"); }, 400);

  $(".btn").off("click");
  $(document).keypress(start);
}
