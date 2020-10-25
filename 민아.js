// 캔버스 가져오기
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// 배경, 공 이미지 표시

var bgImage = new Image();
bgImage.src = "./images/background.png";
var hoopImage = new Image();
hoopImage.src = "./images/hoop.png";
var ball = new Image();
ball.src = "./images/basketball.png";

window.onload = function() {
  context.drawImage(bgImage, 0, 0);
  context.drawImage(hoopImage, 1060, 400);
  context.drawImage(ball, 100, 630, 120, 120);
}

// 타이머

// 타이머 영역 만들기

var timeArea = document.createElement("div");
timeArea.setAttribute("class", "timer area");
document.getElementById("canvas-area").appendChild(timeArea);

var sec = document.createElement("p");
sec.setAttribute("class", "large");
document.querySelector(".timer").appendChild(sec);

var timerText = document.createElement("span");
timerText.setAttribute("class", "bold");
timerText.innerText = "SECOND";
document.querySelector(".timer").appendChild(timerText);

// 타이머

var time = 30;
document.querySelector(".timer > p").innerText = time;
var timer = setInterval(gameTimer, 1000);

function gameTimer() {
  if (time != 0) {
    document.querySelector(".timer > p").innerText = time;
    time -= 1;
  } else {
    document.querySelector(".timer > p").innerText = time;
    clearInterval(timer);
  }
}

gameTimer();

// 스코어 영역 만들기
// 점수 카운트하는 부분이 구현되지 않아 임의로 값 넣어둠

var scoreArea = document.createElement("div");
scoreArea.setAttribute("class", "score area");
document.getElementById("canvas-area").appendChild(scoreArea);

var score = document.createElement("p");
score.setAttribute("class", "large");
score.innerText = 10;
document.querySelector(".score").appendChild(score);

var scoreText = document.createElement("span");
scoreText.setAttribute("class", "bold");
scoreText.innerText = "SCORE";
document.querySelector(".score").appendChild(scoreText);