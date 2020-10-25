// 캔버스 가져오기
var canvas = document.getElementById("background");
var bgContext = canvas.getContext("2d");

// 배경, 공 이미지 표시

var bgImage = new Image();
bgImage.src = "./images/background.png";
var hoopImage = new Image();
hoopImage.src = "./images/hoop.png";
var ball = new Image();
ball.src = "./images/basketball.png";

window.onload = function() {
  bgContext.drawImage(bgImage, 0, 0);
  bgContext.drawImage(hoopImage, 1060, 400);
  bgContext.drawImage(ball, 100, 630, 120, 120);
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

// 각도 조절하는 부분 그리기

var gContext = document.getElementById("game").getContext("2d");

var arrow = new Image();
arrow.src = "./images/arrow.png";
arrow.onload = function() {
  gContext.drawImage(arrow, -1, -1);
}

// 90도 틀 그리기
function arrowFrame() {
  gContext.beginPath();
  gContext.moveTo(248, 610);
  gContext.lineTo(340, 610);
  gContext.strokeStyle = "#707070";
  gContext.lineWidth = 5;
  gContext.stroke();
  gContext.closePath();

  gContext.beginPath();
  gContext.moveTo(250, 520);
  gContext.lineTo(250, 612);
  gContext.strokeStyle = "#707070";
  gContext.lineWidth = 5;
  gContext.stroke();
  gContext.closePath();
}

var degree = 0;
var direction = -1;
var rotateX = -1;
var rotateY = -1;

function moveArrow() {
  
  // 방향 설정
  if (degree == 0) direction = -1;
  else if (degree == -90) direction = 1;

  // 화살표 위치 조정
  rotateX = -(-degree / 10) - 1.5;
  rotateY = -(-degree / 30) * 2 - 1;

  // 화살표 그리기
  gContext.clearRect(0, 0, canvas.width, canvas.height);
  arrowFrame();
  gContext.save();
  gContext.translate(248, 600);
  gContext.rotate(degree * Math.PI / 180);
  gContext.drawImage(arrow, rotateX, rotateY);
  gContext.restore();

  degree += direction;
}

setInterval(moveArrow, 15);