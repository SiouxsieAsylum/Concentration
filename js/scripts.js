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
  let startTimer;
  let speedOfPlay = 0;
  let matching = false;
  let playState = {
    highScore: storage.getItem('high-score'),
    score: -1,
    turnCounter: 0,
    freqCounter: 0,
    gameOn: false,
    gameCount: 0

  };
  let interval;


  playState.highScore && setHighScore();

//----------------------- game logic

  window.addEventListener("keydown", launchGame)

  function launchGame(e){
    let key = e.keyCode;
    startTimer = new Date();


    if (key == 13){
        if (splashPage.style.display = "block"){
          splashPage.style.display = "none";
        }

        tutorial.style.animation = "teach 6s";
        window.removeEventListener("keydown", launchGame);
        window.addEventListener("keydown", keyHandler);

        initFreq();
        zeroFreq();
        disabled = false;
        if (!playState.gameCount) {
          bkgd.play();
          setTimeout(randColor, 5500);
          setTimeout(displayTimer, 5500);
        } else {
          randColor();
          displayTimer();
        }

      }
  }



  function keyHandler(e){
    let key = e.keyCode;
    switch(key){
      case 32:
        audio();
        break;
      case 37:
        if (playState.gameOn) {
          matching ? randColor() : gameOver();
          swoosh.play();
          reset();
        }
      break;
      case 39:
        if (playState.gameOn) {
          !matching ? randColor() : gameOver();
          swoosh.play();
          reset();
        }
        break;
      case 27:
      case 17:
      case 91:
        window.removeEventListener("keydown", keyHandler);
        var stillPlaying = confirm("Game disabled. Would you like to continue playing?");
        stillPlaying ? window.addEventListener("keydown", keyHandler) : gameOver('notPlaying');
        break;
    }
  }

    function gameOver(disclaimer){
      let currentHighScore = parseInt(playState.highScore);

      if (playState.score > currentHighScore) {
        clearInterval(timer);
        highScoreCard.innerHTML = playState.score;
        storage.setItem('high-score', playState.score);
      }
      reset();
      disabled = true;
      darkness.style.animation="dark 3s 1 linear"
      !disclaimer && distort.play();
      !disclaimer && playState.gameCount++;
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
    playState.gameCount++;
    playState.gameOn = false;
    playState.turnCounter = 0;
    scoreCard.innerHTML = 0;
    playState.score = -1;
    window.removeEventListener("keydown", keyHandler);
    window.addEventListener("keydown", launchGame);
    setTimeout(newGame, 7000);
  }
}


function newGame(){

  darkness.style.animation="initial";
  //bkgd.play();
}


// --------------- timers and displays

  function displayTimer(){
    let time = new Date();
    timer.innerHTML = time - startTimer;
  }

  function initFreq (){
    startTimer = new Date();
  }

  function zeroFreq() {
    frequency.innerHTML = "0.00";
  }

 function freq(){
    let now = new Date();
    let ms = now.getTime() - startTimer.getTime();
    let re = /^\d\d\d$/;
    let playerSpeed = `${ms.toPrecision(3)}`;
    playerSpeed = playerSpeed.match(re) || "| | | ";
    frequency.innerHTML = playerSpeed;
    initFreq(); 
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


// -------------------- animations 

  function setStage() {
    let randWord = Math.floor(Math.random() * 9);
    let randColor = Math.floor(Math.random() * 9);

    word.innerHTML = colors[randWord];
    word.style.color = colors[randColor];

    randWord === randColor ? matching = true : matching = false;
  }

  function randColor(){
    setStage();
    playState.score++;
    playState.turnCounter++;
    playState.freqCounter++;
    freq();
    playState.gameOn = true;
    interval = setInterval(displayTimer, .5);
    scoreCard.innerHTML= playState.score;
    win();
  }

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
    u.style.color="rgba(0,0,0,0.8)";
    u.style.transform=" scaleX(-1) translateY(-2vh);";
  }
}

function firstDownLetters(){

 for (d of downs) {
    d.style.color="rgba(0,0,0,0.8)";
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

function flipLetter() {
  const innerHTML = word.innerHTML;
  const length = innerHTML.length;
  let letter = Math.floor(Math.random() * length);
  word[letter].classList.add(".flippedX");
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let num;

// the randomizer to end all randomizers;
function setLevels(){
  let firstRange =  Math.floor(Math.random() * 8 ) + 1;
  let secondRange = Math.floor(Math.random() * 10) + 1;
  let thirdRange = Math.floor(Math.random() * 15) + 1;
  let fourthRange = Math.floor(Math.random() * 30) + 10;
  let fifthRange = Math.floor(Math.random() * 35) + 10;

  for (let i = 1; i < firstRange; i++){
    let level = Math.floor(Math.random() * 8) + 10;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }
    for (let i = 1; i < secondRange; i++){
    let level = Math.floor(Math.random() * 18) + 12;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }
    for (let i = 1; i < thirdRange; i++){
    let level = Math.floor(Math.random() * 18) + 20;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }

  for (let i = 1; i < fourthRange; i++){
    let level = Math.floor(Math.random() * 18) + 30;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }

  for (let i = 1; i < fifthRange; i++){
    let level = Math.floor(Math.random() * 18) + 40;
    if (!levels.includes(level)){
      levels.push(level);
    }
  }
}

function turnSelector(){
  for (let i = 0; i < levels.length; i++){
    let classRandom = Math.floor(Math.random() * 2);
    let compRandom = Math.floor(Math.random() * 2);

    let level = levels[i];

    if (playState.turnCounter == level && playState.turnCounter < 10) {
      word.classList.add(`${classes[classRandom]}`);
      flipLetter();
    } else if (playState.turnCounter == level && playState.turnCounter > 10 &&
     playState.turnCounter < 20){
      word.classList.add(`${classes[classRandom]}`);
      complications[compRandom].call();
    } else if (playState.turnCounter == level && playState.turnCounter > 20){
      word.classList.add(`${classes[classRandom]}`);
      complications[compRandom].call();
      complications[compRandom].call();
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
      case 32:
        audio();
        break;
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
  if(classes[rand] !== 'flippedY') body.classList.add(`${classes[rand]}`);
}

function reset(){
  window.removeEventListener("keydown", swap);
  window.addEventListener("keydown", keyHandler);
  clearInterval(interval);
  arrows.style.display="none";
  body.style.background = "none";
  body.classList = "";
  word.classList = "";
  turnSelector();
}

function setHighScore(){
  highScoreCard.innerHTML = playState.highScore;
}


function audio(){
  let audioDiv = document.getElementById("clickme");
  if (!bkgd.muted){
    bkgd.muted = true;
    audioDiv.style.backgroundImage = "url(images/no_music.png)"
  } else {
    bkgd.muted = false;
    bkgd.loop = true;
    audioDiv.style.backgroundImage = "url(images/yes_music.png)"
  }
}


newGame();
