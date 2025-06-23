//Button sounds


//Game Mode Theme
// toggle theme
const toggleBtn = document.querySelector("#toggletbn");
const body = document.body;
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  if (body.classList.contains("dark-mode")) {
    toggleBtn.innerHTML = "&#9728;";
  } else {
    toggleBtn.innerHTML = "&#9790;";
  }
});

//Start Game button
let levelinfo = document.querySelector(".levelinfo");
let maxscore = 0;
let highscore = document.querySelector(".highscore");
let startbtn = document.querySelector("#startbtn");
let countOverlay = document.querySelector("#countdown-overlay");
let countNum = document.querySelector("#countdown-number");

startbtn.addEventListener("click", () => {
  countOverlay.classList.remove("hidden");
  startbtn.remove();
  let cd = 2;
  const countdown = setInterval(() => {
    countNum.innerText = cd;
    cd--;
    if (cd < 0) {
      clearInterval(countdown);
      countOverlay.classList.add("hidden");
      enableButtons();
      setTimeout(() => {
        levelup();
      }, 400);
    }
  }, 1000);
});

function enableButtons() {
  for (let color of colors) {
    color.classList.remove("disabled");
  }
}

function disableButtons() {
  for (let color of colors) {
    color.classList.add("disabled");
  }
}

//Game Started
let gameSeq = [];
let userSeq = [];
let green = document.querySelector("#green");
let red = document.querySelector("#red");
let yellow = document.querySelector("#yellow");
let blue = document.querySelector("#blue");

let colors = [green, red, yellow, blue];
let level = 0;
function levelup() {
  userSeq = [];
  level++;
  levelinfo.innerText = `Level ${level}`;
  //select random btn to flash
  let ranidx = Math.floor(Math.random() * 4);
  let btn = colors[ranidx];
  gameSeq.push(colors[ranidx]);
  btnflash(btn);
}

const soundMap = {
  green: "sound1",
  red: "sound2",
  yellow: "sound3",
  blue: "sound4",
};
function btnflash(btn) {
  const soundId = soundMap[btn.id];
  btn.classList.add("flash");
  const audio = document.getElementById(soundId);
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

//User Click
for (let color of colors) {
  color.addEventListener("click", btnPressed);
}
function btnPressed() {
  let btn = this;
  btnflash(btn);
  userSeq.push(btn);
  checkAns(userSeq.length - 1); //sending userSeq index
}

//checking sequence
function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelup, 800);
    }
  } else {
    //reset Game
    body.classList.add("wrongbtn");
    setTimeout(() => {
      body.classList.remove("wrongbtn");
    }, 350);
    levelinfo.innerHTML = `<b>Game Over ! Your score was ${level - 1}</b>`;
    if (maxscore < level - 1) {
      maxscore = level - 1;
      highscore.innerText = `High Score : ${maxscore}`;
    }
    resetGame();
  }
}

function resetGame() {
  disableButtons();
  gameSeq = [];
  userSeq = [];
  level = 0;
  countNum.innerText = 3;
  startbtn.innerText = "Play Again";
  startbtn.style.backgroundColor = "rgb(131, 194, 117)";
  document.querySelector("main").appendChild(startbtn);
}
