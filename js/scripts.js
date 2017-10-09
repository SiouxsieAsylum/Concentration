// well already I've set myself two expectations
// modal for username
// has an input

// window.addEventListener('DOMContentLoaded', function(e){
  // literally all other code in here

// 2. make a game over spash page
// 4. make a "frequency counter" function
// 5. then make shit cray cray


  let storage = window.localStorage;
  // storage.setItem("check", "check")
  // console.log(storage.getItem("check"));
  if (storage.getItem("high-score") === null){
    storage.setItem("high-score", "0");
  }



  const colors = ["red", "blue", "green", "cyan", "purple", "orange", "yellow", "grey", "black"];
  const word = document.getElementById("word");
  const timer = document.getElementById("timer");
  const scoreCard = document.getElementById("scorecard");
  const highScoreCard = document.getElementById("high-scorecard");
  const frequency = document.getElementById("frequency");
  const splashPage = document.getElementById("splashPage");
  let freqCounter = 0.0;
  let startTimer = new Date();
  let speedOfPlay = 0;
  let highScore = storage.getItem('high-score');
  let matching = false;
  let score = -1;
  let turnCounter = 0;

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
    setInterval(displayTimer, .5);
    scoreCard.innerHTML= score;
  }

  function keyHandler(e){
    let key = e.keyCode;

    switch(key){
      case 37:
        matching ? randColor() : gameOver();
        break;
      case 39:
        !matching ? randColor() : gameOver();
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
    splashPage.style.display="block";
    turnCounter = 0;
    scoreCard.innerHTML = 0;
    score = -1;
    // randColor();
  }

  window.addEventListener("keydown", keyHandler)

  function displayTimer(){
    let time = new Date();

    timer.innerHTML = time - startTimer;
  }

  function freq(){

    let currentClicks =  freqCounter;
    // freqCounter > highestFreq ? highestFreq = frequency : highestFreq;

    if (currentClicks <= 0){
      clearInterval(freq);
      frequency.innerHTML = 0;
      gameOver();
      // h3.innerHTML = highestFreq;
    } else {
      frequency.innerHTML = currentClicks;
    }
    freqCounter = 0.0;
  }

function displayFreq(){
  setInterval(freq, 1000);
}




  // what is the refresh conditions?
  //  what do I wanna do for the loss?
  //  animate a splash page
