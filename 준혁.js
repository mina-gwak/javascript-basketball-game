// 캔버스 가져오기

var bgCanvas = document.getElementById("background");
var bgCtx = bgCanvas.getContext("2d");

var gCanvas = document.getElementById("game");
var gCtx = gCanvas.getContext("2d");

// 배경, 공 이미지 표시

var bgImage = new Image();
bgImage.src = "./images/background.png";
var hoopImage = new Image();
hoopImage.src = "./images/hoop.png";
var ball = new Image();
ball.src = "./images/basketball.png";

function drawBackground(){
    bgCtx.drawImage(bgImage, 0, 0);
    bgCtx.drawImage(hoopImage, 1060, 400);
    bgCtx.drawImage(ball, 100, 630, 120, 120);
}

const width = gCanvas.width;
const height = gCanvas.height;
let ballX = 100;
let ballY = 630;
let ballPower;
let ballVx;
let ballVy;
let gauge = 0;
let isCharging = false;
let isFired = false;
let isHitted = false;
const GRAVITY_ACCELERATION = 0.098;
let degree = 45;

// 공 그리기

function drawBall(){
    gCtx.beginPath();
    gCtx.arc(ballX, ballY, 60, 0, Math.PI * 2);
    gCtx.stroke();
}

function draw(){
    gCtx.clearRect(0,0,width,height);
    drawGauging();
    drawGaugeBar();
    drawBall();
    drawBackground();

    if(!isFired){
        ballX = 100;
        ballY = 630;
    }
    else{
        ballVy += 1.98;
        ballX = ballX + ballVx;
        ballY = ballY + ballVy;
    }
}

function drawGaugeBar(){
    gCtx.strokeRect(635,100,200,30);
    gCtx.lineWidth = 3;
    gCtx.font = "20px bold"
    gCtx.fillText("파워 게이지", 685, 180);
}

function drawGauging(){
    if(gauge<=200 && isCharging && !isFired){
        gCtx.fillStyle = "#E67567";
        gauge += 1;
        gCtx.fillRect(635,100,gauge,30);
    }
    else if(!isCharging && isFired){
        gCtx.fillStyle = "black";
        gCtx.fillRect(635,100,0,30);
    }
    else if(isCharging){
        gCtx.fillRect(635,100,200,30);
    }
};

// 스페이스바 입력

const keydownHandler = event => {
    if (event.keyCode === 32) {
        isCharging = true;
        isFired = false;
        draw();
    }
};

const keyupHandler = event => {
    if(event.keyCode === 32 && !isFired){
        isCharging = false;
        isFired = true;
        ballPower = gauge / 1.98;
        let degreeR = degree * Math.PI / 180;
        ballVx = ballPower * Math.cos(degreeR);
        ballVy = -ballPower * Math.sin(degreeR);
        gauge = 0;
    }
};

const start = setInterval(draw, 10);
document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);