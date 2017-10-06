// let storage = window.localStorage;
// storage.setItem('high-score', score);
// storage.setItem('player', name);

// well already I've set myself two expectations
// modal for username
// has an input
console.log("I'm here")
// window.addEventListener('DOMContentLoaded', function(e){
  // literally all other code in here
  const colors = ["red", "blue", "green", "cyan", "purple", "orange", "yellow", "grey", "black"];
  const word = document.getElementById("word");
  const test = document.getElementById("test");

  function randColor(){
    let randWord = Math.floor(Math.random() * 9 - 0);
    let randColor = Math.floor(Math.random() * 9 - 0);
    // console.log(rand);
    word.innerHTML = colors[randWord];
    word.style.color = colors[randColor];
  }
// })
