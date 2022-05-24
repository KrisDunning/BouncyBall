/*Code from:https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10; var ballColor = "red";
var score = 0;
var lives = 3;
var x = canvas.width / 2; var y = canvas.height - 30;
var dx = Math.floor(Math.random() * (2 - -2 + 1) + -2);
var dy = -2; var paddleHeight = 12;
var paddleWidth = 72;
var paddleColor = "blue";
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 4;
var brickColumnCount = 7;
var brickWidth = 80;
var brickHeight = 24;
var brickPadding = 12;
var brickOffsetTop = 40;
var brickOffsetLeft = 140;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          ballColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
          dy > 0 ? dy += .5 : dy -= .5;
          if (score == brickRowCount * brickColumnCount) {
            alert("Congratulations! You have won!")
            document.location.reload();
          }
        }
      }
    }
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      paddleColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      //possible to use left/right side of paddle to change angle
      x<paddleX+paddleWidth/2?dx-=.2:dx+=.2;
        }else{
         lives--;if(!lives){
          alert("Game Over!");
          document.location.reload();}
          else{
            x=canvas.width/2;
            y-canvas.height-30;
            dx=2;dy=-2;
            paddleX=(canvas.width-paddleWidth)/2;
          }
        } 
      }if(rightPressed && paddleX<canvas.width-paddleWidth){
        paddleX+=7;}
        if(leftPressed && paddleX>0){paddleX-=7;
        }
        x+=dx;
        y+=dy;
        requestAnimationFrame(draw);
      }
      function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ballColor;
        ctx.fill();
        ctx.closePath();
      }
      function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = paddleColor;
        ctx.fill();
        ctx.closePath();
      }
      function drawBricks() {
        for (c = 0; c < brickColumnCount; c++) {
          for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
              var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
              var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#6600cc";
              ctx.fill();
              ctx.closePath();
            }
          }
        }
      }

      function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "brown";
        ctx.fillText("Score: " + score, 8, 20);
      }
      function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillstyle = "brown";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
      }

      draw();
