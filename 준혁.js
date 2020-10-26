// 캔버스 가져오기

var bgCanvas = document.getElementById("background");
var bgCtx = bgCanvas.getContext("2d");

var gCanvas = document.getElementById("game");
var gCtx = gCanvas.getContext("2d");

// 배경, 공 이미지 표시

// var bgImage = new Image();
// bgImage.src = "./images/background.png";
// var hoopImage = new Image();
// hoopImage.src = "./images/hoop.png";
// var ball = new Image();
// ball.src = "./images/basketball.png";

// function drawBackground(){
//     bgCtx.drawImage(bgImage, 0, 0);
//     bgCtx.drawImage(hoopImage, 1060, 400);
//     bgCtx.drawImage(ball, 100, 630, 120, 120);
// }

const width = bgCanvas.width;
const height = bgCanvas.height;
let ballX = 100;
let ballY = 630;
let ballPower=0;
let ballVx;
let ballVy;
let isCharging = false;
let isFired = false;
let isHitted = false;
const GRAVITY_ACCELERATION = 0.098;
let degree = 30;

// 공 그리기

function drawBall(){
    gCtx.beginPath();
    gCtx.arc(ballX, ballY, 60, 0, Math.PI * 2);
    gCtx.stroke();
}

function draw(){
    gCtx.clearRect(0,0,width,height);
    if(isFired){
        ballVx = ballPower * Math.cos(degree);
        ballVy = -ballPower * Math.sin(degree);
    }
    drawGauging();
    drawGaugeBar();
    drawBall();
    // drawBackground();
}

function calculate(){
    ballVy += GRAVITY_ACCELERATION;
    ballX += ballVx;
    ballY += ballVy;

    draw();
}

function drawGaugeBar(){
    gCtx.strokeRect(635,100,200,30);
    gCtx.lineWidth = 3;
    gCtx.font = "20px bold"
    gCtx.fillText("파워 게이지", 685, 180);
}

function drawGauging(){
    if(ballPower<=200 && isCharging){
        gCtx.fillStyle = "#E67567";
        ballPower += 1;
        gCtx.fillRect(635,100,ballPower,30);
    }
    else if(!isCharging){
        gCtx.fillStyle = "black";
        gCtx.fillRect(635,100,0,30);
    }
    else if(isCharging){
        gCtx.fillRect(635,100,200,30);
    }
};

// draw();

// 스페이스바 입력

const keydownHandler = event => {
    if (event.keyCode === 32) {
        isCharging = true;
        isFired = false;
        draw();
    }
};

const keyupHandler = event => {
    if (event.keyCode === 32) {
        isCharging = false;
        isFired = true;
        ballPower = 0;
    }
};

const start = setInterval(draw, 10);
document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);