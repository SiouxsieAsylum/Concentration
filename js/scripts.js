// well already I've set myself two expectations
// modal for username
// has an input

// window event listener e.target will be used in final build
// window.addEventListener('DOMContentLoaded', function(e){
  // literally all other code in here




// 1. high score's size is 0 on github pages
// 2. make a game over spash page
// 3. make a timer function
// 4. make a "frequency counter" function
// 5. then make shit cray cray
// 6. requires a turnCounter tho



















  let storage = window.localStorage;



  const colors = ["red", "blue", "green", "cyan", "purple", "orange", "yellow", "grey", "black"];
  const word = document.getElementById("word");
  const test = document.getElementById("test");
  const scoreCard = document.getElementById("scorecard");
  const highScoreCard = document.getElementById("high-scorecard");
  let highScore = storage.getItem('high-score');

  let matching = false;
  let score = -1;
  let turnCounter = 0;

  console.log("storage "+ storage);
  console.log("high score "+highScore);


  highScore !== null ? highScoreCard.innerHTML = highScore : highScore;

  function randColor(){
    let randWord = Math.floor(Math.random() * 9 - 0);
    let randColor = Math.floor(Math.random() * 9 - 0);

    word.innerHTML = colors[randWord];
    word.style.color = colors[randColor];

    randWord === randColor ? matching = true : matching = false;

    score++;
    turnCounter++;
    scoreCard.innerHTML= score;
    console.log("check");
    console.log("high score "+highScore);
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
      highScoreCard.innerHTML = score;
      storage.setItem('high-score', score);
    }
    turnCounter = 0;
    scoreCard.innerHTML = 0;
    score = -1;
    randColor();
  }

  window.addEventListener("keydown", keyHandler)


  // what is the refresh conditions?
  //  what do I wanna do for the loss?
  //  animate a splash page
