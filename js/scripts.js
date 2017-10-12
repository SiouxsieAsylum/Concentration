// translations when words come in and out
// home screen has achievements board
// achievement tings on side
// format timer that formatted ss:mm

  let storage = window.localStorage;
  if (storage.getItem("high-score") === null){
    storage.setItem("high-score", "0");
  }

  const colors = ["red", "blue", "green", "cyan", "purple", "orange", "yellow", "grey", "black"];
  const word = document.getElementById("word");
  const timer = document.getElementById("timer");
  const scoreCard = document.getElementById("scorecard");
  const highScoreCard = document.getElementById("high-scorecard");
  const frequency = document.getElementById("freqNumber");
  const splashPage = document.getElementById("titlePage");
  const arrows = document.getElementById("arrows");
  const swoosh = document.getElementById("swoosh");
  const distort = document.getElementById("distort");
  const bkgd = document.getElementById("bkgd");
  const darkness = document.getElementById("darkness");
  const tutorial = document.getElementById("tutorial");
  const body = document.getElementsByTagName("body")[0];
  let classes = ["flippedX","flippedY","flipped"];
  let complications = [invert, backgroundColor, backgroundFlip];

  let levels = [];
  // let gameOn = false;
  // let freqCounter = 0;
  let startTimer = new Date();
  let speedOfPlay = 0;
  // let highScore = storage.getItem('high-score');
  let matching = false;
  // let score = -1;
  // let turnCounter = 1;
  let playState = {
    highScore: storage.getItem('high-score'),
    score: -1,
    turnCounter: 0,
    freqCounter: 0,
    gameOn: false,
  };

  playState.highScore !== null ? highScoreCard.innerHTML = playState.highScore : playState.highScore;


  window.addEventListener("keydown", launchGame)

  function launchGame(e){
    let key = e.keyCode;

    if (key == 13){
        if (splashPage.style.display = "block"){
          splashPage.style.display = "none";
        }

        tutorial.style.animation = "teach 6s";
        window.removeEventListener("keydown", launchGame);
        window.addEventListener("keydown", keyHandler);

        setTimeout(randColor, 5500);
        setTimeout(displayTimer, 5500);
      }
  }

  function randColor(){
    startTimer = new Date();

    let randWord = Math.floor(Math.random() * 9 - 0);
    let randColor = Math.floor(Math.random() * 9 - 0);

    word.innerHTML = colors[randWord];
    word.style.color = colors[randColor];

    randWord === randColor ? matching = true : matching = false;

    playState.score++;
    playState.turnCounter++;
    playState.freqCounter++;
    playState.gameOn = true;
    setInterval(displayTimer, .5);
    scoreCard.innerHTML= playState.score;
    console.log(playState.turnCounter);
    win();
  }

  function keyHandler(e){
    let key = e.keyCode;

    switch(key){
      case 37:
        matching ? randColor() : gameOver();
        swoosh.play();
        reset();
        break;
      case 39:
        !matching ? randColor() : gameOver();
        swoosh.play();
        reset();
        break;
      case 27:
      case 17:
      case 91:
        window.removeEventListener("keydown", keyHandler);
        var stillPlaying = confirm("Game disabled. Would you like to continue playing?");
        stillPlaying ? window.addEventListener("keydown", keyHandler) : gameOver();
        break;
    }
  }

    function gameOver(){
      let currentHighScore = parseInt(playState.highScore);

      if (playState.score > currentHighScore) {
        clearInterval(timer);
        highScoreCard.innerHTML = playState.score;
        storage.setItem('high-score', playState.score);
      }
      reset();
      darkness.style.animation="dark 3s 1 linear"
      distort.play();
      window.addEventListener("keydown", launchGame);
      splashPage.style.display="block";
      levels = [];
      setLevels();
      turnSelector();
      playState.gameOn = false;
      playState.turnCounter = 0;
      scoreCard.innerHTML = 0;
      playState.score = -1;
      setTimeout(newGame, 7000);
      console.log(playState.turnCounter);
  }

  function displayTimer(){
    let time = new Date();
    timer.innerHTML = time - startTimer;
  }

 function freq(){
    let currentClicks = playState.freqCounter;
    frequency.innerHTML = currentClicks;
    playState.freqCounter = 0;
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
}

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
}

function turnSelector(){
  for (let i = 0; i < levels.length; i++){
    let classRandom = Math.floor(Math.random() * 2 - 0);
    let compRandom = Math.floor(Math.random() * 2 - 0);
    let compExtra = Math.floor(Math.random() * 2 - 0);

    let level = levels[i];

    if (playState.turnCounter == level && playState.turnCounter < 10){
      // console.log("firstlevel");
      word.classList.add(`${classes[classRandom]}`);
    } else if (playState.turnCounter == level && playState.turnCounter > 10 &&
     playState.turnCounter < 20){
      console.log("thirdlevel");
      word.classList.add(`${classes[classRandom]}`);
      complications[compRandom].call();
    } else if (playState.turnCounter == level && playState.turnCounter > 20){
      console.log("fourthlevel");
      word.classList.add(`${classes[classRandom]}`);
      complications[compRandom].call();
      body.classList.add(`${classes[classRandom]}`);
    }
  }

}


function backgroundColor(){

  let body = document.getElementsByTagName("body")[0];
  let rgbcolors = ["rgba(255, 0, 0,0.7)","rgba(0, 0, 255,0.7)","rgba(0, 128, 0,0.7)","rgba(0, 255, 255, 0.7)","rgba(128, 0, 128, 0.7)","rgba(255, 165, 0, 0.7)","rgba(255, 255, 0, 0.7)","rgba(128, 128, 128,0.7)","rgba(0, 0, 0, 0.7)"];
  let rand = Math.floor(Math.random() * 9 - 0);

  body.style.backgroundColor = `${rgbcolors[rand]})`
}

function swap(e){
  let key = e.keyCode;

      switch(key){
      case 39:
        matching ? randColor() : gameOver();
        reset();
        swoosh.play();
        break;
      case 37:
        !matching ? randColor() : gameOver();
        reset();
        swoosh.play();
        break;
      case 27:
      case 17:
      case 91:
        window.removeEventListener("keydown", keyHandler);
        var stillPlaying = confirm("Game disabled. Would you like to continue playing?");
        stillPlaying ? window.addEventListener("keydown", keyHandler) : alert("Game Over");
        break;
    }
  }

function invert(){
  window.removeEventListener("keydown", keyHandler);
  window.addEventListener("keydown", swap);
  arrows.style.display = "block";
}

function backgroundFlip(){
  let rand = Math.floor(Math.random() * 2 - 0);
  body.classList.add(`${classes[rand]}`);
}

function reset(){
  // console.log("resetting");
  window.removeEventListener("keydown", swap);
  window.addEventListener("keydown", keyHandler);

  arrows.style.display="none";
  body.style.background = "none";
  body.classList = "";
  word.classList = "";
  turnSelector();
}


function audio(){

  let audioDiv = document.getElementById("clickme");
  if (!bkgd.muted){
    bkgd.muted = true;
    audioDiv.style.backgroundImage = "url(images/no_music.png)"
  } else {
    bkgd.muted = false;
    audioDiv.style.backgroundImage = "url(images/yes_music.png)"
  }
}

function win(){
  let help = document.getElementById("help");
  if (playState.turnCounter == 51) {
    darkness.style.animation="win 7s";
    splashPage.style.display="block";
    bkgd.pause();
    help.play();
    levels = [];
    setLevels();
    turnSelector();
    playState.gameOn = false;
    playState.turnCounter = 0;
    scoreCard.innerHTML = 0;
    playState.score = -1;
    window.removeEventListener("keydown", keyHandler);
    window.addEventListener("keydown", launchGame);
    setTimeout(newGame, 7000);
    console.log(playState.turnCounter);
  }
}


function newGame(){
  darkness.style.animation="initial";
  bkgd.play();
}

