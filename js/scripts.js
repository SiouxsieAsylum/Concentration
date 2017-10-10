// What needs to be done now
// every X turns, pick a rand number. On that turn, add a new transformation option
// transformations include
// word upside down
// word spelled backwards
// inverted controlls
// background a radial gradient of correct color
// background a radial gradient of incorrect color
// timer displays backwards
// etc

// also, adding a blinking to the game over screen
// translations when words come in and out
// home screen has achievements board
// achievement tings on side
// format timer that formatted ss:mm
// sounds

// audio for menu https://www.youtube.com/watch?v=BnmglWHoVrk
// https://www.youtube.com/watch?v=i6O6I3M4qEY



  let storage = window.localStorage;
  if (storage.getItem("high-score") === null){
    storage.setItem("high-score", "0");
  }

  const colors = ["red", "blue", "green", "cyan", "purple", "orange", "yellow", "grey", "black"];
  const word = document.getElementById("word");
  const timer = document.getElementById("timer");
  const scoreCard = document.getElementById("scorecard");
  const highScoreCard = document.getElementById("high-scorecard");
  const frequency = document.getElementById("frequency");
  const splashPage = document.getElementById("titlePage");
  let classes = ["flippedX","flippedY","flipped"];
  let complications = [invert, backgroundColor, backgroundFlip];
  let body = document.getElementsByTagName("body")[0];
  let levels = [];
  let gameOn = false;
  let freqCounter = 0;
  let startTimer = new Date();
  let speedOfPlay = 0;
  let highScore = storage.getItem('high-score');
  let matching = false;
  let score = -1;
  let turnCounter = 0;
  let freqencyVar;
  let countDownVar;

  highScore !== null ? highScoreCard.innerHTML = highScore : highScore;

  function randColor(){
    startTimer = new Date();

    let randWord = Math.floor(Math.random() * 9 - 0);
    let randColor = Math.floor(Math.random() * 9 - 0);

    if (splashPage.style.display = "block"){
      splashPage.style.display = "none";
    }

    word.innerHTML = colors[randWord];
    word.style.color = colors[randColor];

    randWord === randColor ? matching = true : matching = false;

    score++;
    turnCounter++;
    freqCounter++;
    gameOn = true;
    setInterval(displayTimer, .5);
    scoreCard.innerHTML= score;
    turnSelector();

    // checkInactivity();
    // window.addEventListener("keydown", keyHandler);
  }

  function keyHandler(e){
    let key = e.keyCode;

    switch(key){
      case 37:
        matching ? randColor() : gameOver();
        reset();
        break;
      case 39:
        !matching ? randColor() : gameOver();
        reset();
        break;
      case 27:
      case 17:
      case 91:
        window.removeEventListener("keydown", keyHandler);
        // var stillPlaying = confirm("Game disabled. Would you like to continue playing?");
        // stillPlaying ? window.addEventListener("keydown", keyHandler) : alert("Game Over");
        break;
      default:
        alert("Left or Right Arrow only please");
        break;
    }
  }


    function gameOver(){
      let currentHighScore = parseInt(highScore);

      if (score > currentHighScore) {
        clearInterval(timer);
        highScoreCard.innerHTML = score;
        storage.setItem('high-score', score);
      }

      window.addEventListener("keydown", keyHandler);
      splashPage.style.display="block";
      levels = [];
      setLevels();
      turnSelector();
      gameOn = false;
      turnCounter = 0;
      scoreCard.innerHTML = 0;
      score = -1;
  }

  function displayTimer(){
    let time = new Date();
    timer.innerHTML = time - startTimer;
  }

 function freq(){
    // console.log("interval is going");
    let currentClicks =  freqCounter;
    frequency.innerHTML = currentClicks;
    freqCounter = 0;
  }

function close(){
  stillPlaying.style.display = "none";
  window.addEventListener("keydown", keyHandler);
}


 function displayFreq(){
  frequencyVar = setInterval(freq, 1000);
}

function stopFreq(){
  clearInterval(frequencyVar);
  console.log("stop freqing");
}

  window.addEventListener("keydown", keyHandler)


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function animateLetters(){
  setInterval(firstUpLetters, 1500);
  setInterval(firstDownLetters, 1500);
  setInterval(resetUpLetters, 5500);
  setInterval(resetDownLetters, 5500);
}

let ups = Array.from(document.getElementsByClassName("up"));
let downs = Array.from(document.getElementsByClassName("down"));
let title = document.getElementById("title");


function firstUpLetters(){
 for (u of ups) {
    u.style.color="rgba(255,255,255,0.8)";
    u.style.transform=" scaleX(-1) translateY(-2vh);";
  }
}

function firstDownLetters(){

 for (d of downs) {
    d.style.color="rgba(255,255,255,0.8)";
    d.style.transform=" scaleX(-1) translateY(-2vh)";
  }
}

function resetUpLetters(){
  title.style.transform="scaleX(1)"
 for (u of ups) {
    u.style.color="black";
    u.style.transform="initial";
    u.style.textShadow = "none";
      }
}

function resetDownLetters(){
 for (d of downs) {
    d.style.color="black";
    d.style.transform="initial";
    d.style.textShadow = "none";
  }
}

function nextUpLetters(){
  title.style.transform="scaleX(-1)"
   for (u of ups) {
    u.style.transform="rotate(15deg) scaleX(-1) translateY(-5vh);";
    randomColor(u);
    randomTextShadow(u);
  }
}

function nextDownLetters(){
   for (d of downs) {
    d.style.transform="rotate(-20deg) scaleX(1) translateY(0vh);";
    randomColor(d);
    randomTextShadow(d);
  }
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


let num;

// the randomizer to end all randomizers;
function setLevels(){
  let firstRange =  Math.floor(Math.random() * 8 - 0) + 1;
  let secondRange = Math.floor(Math.random() * 10 - 0) + 1;
  let thirdRange = Math.floor(Math.random() * 15 - 0) + 1;
  let fourthRange = Math.floor(Math.random() * 30 - 0) + 10;
  let fifthRange = Math.floor(Math.random() * 35 - 0) + 10;

  for (let i = 1; i < firstRange; i++){
    let level = Math.floor(Math.random() * 8 - 0) + 10;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }
    for (let i = 1; i < secondRange; i++){
    let level = Math.floor(Math.random() * 18 - 0) + 12;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }
    for (let i = 1; i < thirdRange; i++){
    let level = Math.floor(Math.random() * 18 - 0) + 20;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }

  for (let i = 1; i < fourthRange; i++){
    let level = Math.floor(Math.random() * 18 - 0) + 30;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }

  for (let i = 1; i < fifthRange; i++){
    let level = Math.floor(Math.random() * 18 - 0) + 40;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }
  console.log(levels);
}


//
function turnSelector(){
  for (let i = 0; i < levels.length; i++){
    let classRandom = Math.floor(Math.random() * 2 - 0);
    let compRandom = Math.floor(Math.random() * 2 - 0);
    let compExtra = Math.floor(Math.random() * 2 - 0);

    let level = levels[i];

    if (turnCounter == level && turnCounter < 10){
      console.log("firstlevel");
      word.classList.add(`${classes[classRandom]}`);
    } else if (turnCounter == level && turnCounter < 10){
      console.log("secondlevel");
      complications[compRandom].call();
    } else if (turnCounter == level && turnCounter > 10 &&
     turnCounter < 20){
      console.log("thirdlevel");
      word.classList.add(`${classes[classRandom]}`);
      complications[compRandom].call();
    } else if (turnCounter == level && turnCounter > 20){
      console.log("fourthlevel");
      word.classList.add(`${classes[classRandom]}`);
      complications[compRandom].call();
      body.classList.add(`${classes[classRandom]}`);
    }
    // turnCounter == i + 1 ? reset() : console.log("classRemoved");
  }

  // turnCounter == num + 1 ? word.classList = "" : console.log("classRemoved");
}


function backgroundColor(){

  let body = document.getElementsByTagName("body")[0];
  let rgbcolors = ["rgba(255, 0, 0,0.7)","rgba(0, 0, 255,0.7)","rgba(0, 128, 0,0.7)","rgba(0, 255, 255, 0.7)","rgba(128, 0, 128, 0.7)","rgba(255, 165, 0, 0.7)","rgba(255, 255, 0, 0.7)","rgba(128, 128, 128,0.7)","rgba(0, 0, 0, 0.7)"];
  let rand = Math.floor(Math.random() * 9 - 0);

  body.style.background = `radial-gradient(circle, rgba(255,255,255,1.0), ${rgbcolors[rand]})`
}

function swap(e){
  let key = e.keyCode;

      switch(key){
      case 39:
        matching ? randColor() : gameOver();
        // word.classList = "";
        break;
      case 37:
        !matching ? randColor() : gameOver();
        // word.classList = "";
        break;
      case 27:
      case 17:
      case 91:
        window.removeEventListener("keydown", keyHandler);
        // var stillPlaying = confirm("Game disabled. Would you like to continue playing?");
        // stillPlaying ? window.addEventListener("keydown", keyHandler) : alert("Game Over");
        break;
      default:
        alert("Left or Right Arrow only please");
        break;
    }
  }




function invert(){
  window.removeEventListener("keydown", keyHandler);
  window.addEventListener("keydown", swap);
}

function backgroundFlip(){
  let rand = Math.floor(Math.random() * 2 - 0);
  body.classList.add(`${classes[rand]}`);
}

function reset(){
  window.removeEventListener("keydown", swap);
  window.addEventListener("keydown", keyHandler);

  body.style.background = "none";
  body.classList = "";
  word.classList = "";
}

// see if all this shit works


  // what is the refresh conditions?
  //  what do I wanna do for the loss?
  //  animate a splash page

    //  function checkInactivity() {
  //   let currentClicks =  freqCounter;
  //   if (currentClicks <= 0 && gameOn == true ){

  //   setTimeout(function(){
  //     console.log("check");
  //     // stopFreq();
  //     stillPlaying.style.display = "block";
  //     executeCountdown();
  //     window.removeEventListener("keydown", keyHandler);
  //     window.addEventListener("keydown",close);
  //   }, 5000);

  //   }
  // }

 // function executeCountdown(){
 //  countDownVar = setInterval(countDown, 1000);
 // }

 //  function countDown(){
//   // console.log("doo doo doo");
//   let displayCount = document.getElementById("count");
//   let count = parseInt(displayCount.innerHTML);
//   if (count > 1){
//     count = count - 1;
//     displayCount.innerHTML = count;
//   } else {
//     inactivity();
//   }
// }

// function stopCountdown(){
//   console.log("stopCounting");
//   clearInterval(countDownVar);
// }

// function inactivity(){
//   // console.log("inactivity running");
//   stopFreq();
//   stopCountdown();
//   frequency.innerHTML = 0;
//   gameOver();
// }
