//Selecting all the DOM objects
const buttons = document.querySelectorAll(".btn");
const gameLevelStatus = document.querySelector(".gameLevelStatus");
const startReset = document.querySelector(".start-reset");
const highestScore= document.querySelector(".highestScore");

//Declaring variables
let currLevel = 0;
const gameSequence = [];
const playerSequence = [];
let hasGameBegun = false;
let score=0;
let highestScoreNum=0;

function levelUp() {
  //Increment the level and displays it on the screen
  currLevel++;

  gameLevelStatus.innerHTML = `Level ${currLevel}`;

  //Update the score and add the score of the previous level
  score= score + currLevel-1;

  //Select a random button from 'buttons'
  let randomIndex = Math.floor(Math.random() * 4); //generates numbers between 0 and 3

  //Flash the random button and add it to the gameSequence (after some delay)
  setTimeout(() => {
    flashButton(buttons[randomIndex]);
  }, 500);

  gameSequence.push(buttons[randomIndex]);

  //Empty the playerSequence
  playerSequence.length = 0;
}

// This function flashes the DOM object passed to it
function flashButton(button) {
  button.classList.add("flash-button");
  setTimeout(() => {
    button.classList.remove("flash-button");
  }, 200);
}

function resetGame(){
    currLevel = 0;
    gameSequence.length=0;
    playerSequence.length=0;
    hasGameBegun = false;
    gameLevelStatus.innerText= "Press 'Start' to begin the game";
    startReset.innerText="Start";
    score=0;
}


//Step 1: Start the game on pressing the 'Start' button
startReset.addEventListener("click", () => {
  //Check if the game has already begun
  if (!hasGameBegun) {
    hasGameBegun = true;
    levelUp();
    startReset.innerText = "Reset";
  }
  else{
    resetGame();
  }
});

// This function matches the two sequences, only till the length of playerSequence
function matchSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== gameSequence[i]) {
      return false;
    }
  }
  return true;

  // return playerSequence[playerSequence.length-1]===gameSequence[playerSequence.length-1];

}

function btnPress(btn) {
  //Flash the pressed btn
  flashButton(btn);

  //Add it to the playerSequence
  playerSequence.push(btn);

  //Match the playerSquence with the gameSequence
  if (!matchSequence()) {
    //GAME OVER
    //Step1: Change the text
    gameLevelStatus.innerText = `GAME OVER!!!! Your score is ${score}`;

    //Step 2: Check if the highestScoreNum has to be changed to not and update it
    if(highestScoreNum < score){
      highestScoreNum= score;
    }
    highestScore.innerText=`Highest Score: ${highestScoreNum}`;

    //Step 3: flash red color in the bg
    document.body.classList.add("bg-red");
    setTimeout(() => {
      document.body.classList.remove("bg-red");
    }, 200);

    return;
  }
  if (playerSequence.length == gameSequence.length) {
    levelUp();
  }
}

//Step 2: Add event listeners to all the 4 buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    btnPress(button);
  });
});
