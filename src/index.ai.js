var canvas = document.querySelector("canvas"),
  width = (canvas.width = this.innerWidth),
  height = (canvas.height = this.innerHeight),
  player1Vel = 0,
  player2Vel = 0,
  player1X = 0,
  player2X = 0,
  ballFract = 0.004,
  delta = 0,
  ballX = (ballX = width / 2 - 5),
  ballY = height / 2,
  ballVelX = new Date() & 1 ? width * ballFract : -width * ballFract,
  ballVelY = new Date() & 1 ? height * ballFract : -height * ballFract,
  p1 = 0,
  p2 = 0,
  playerWidth,
  fifty = 50,
  ten = 10,
  ballDim,
  fifteen = 15,
  hundred = 100,
  min = Math.min,
  max = Math.max,
  raf = this.requestAnimationFrame,
  listener = this.addEventListener,
  context = canvas.getContext("2d");
player1X = player2X = ballX = width / 2 - fifty;

let init = () => {
  width = canvas.width = this.innerWidth;
  height = canvas.height = this.innerHeight;
  playerWidth = width / 8;
  ballDim = width / 80;
  context.font = `40px Arial`;
};
init();
listener("resize", () => init());
let keyMap = {};
var keyboardListener = (e) => {
  keyMap[e.keyCode] = e.type == "keydown";
};
listener("keydown", keyboardListener);
listener("keyup", keyboardListener);
canvas.ontouchmove = (e) => {
  player1X = e.touches[0].clientX - fifty;
};

let collision = () => {
  if (ballX < 0 || ballX > width - ten) ballVelX *= -1;

  if (ballY < -10 || ballY > height - ten) {
    ballVelY *= -1;
    if (ballY > 0) p1++;
    if (ballY < 0) p2++;
    ballX = width / 2;
    ballY = height / 2;
  }
  if (ballX > player1X && ballX < player1X + playerWidth && ballY <= ten)
    ballVelY = min(ballVelY * -1.1, ten);
  if (
    ballX > player2X &&
    ballX < player2X + playerWidth &&
    ballY >= height - 25
  )
    ballVelY = min(ballVelY * -1.1, ten);
};

let last = undefined;

let s = (now) => {
  if (!last) last = now;
  delta = now - last;

  if (delta > 1000 / 60) {
    if (keyMap[37]) player1Vel -= fifteen;
    if (keyMap[39]) player1Vel += fifteen;
    if (ballVelY > 0) {
      if (player2X + fifty - ballX + 5 > 0) {
        player2Vel -= 5;
      }
      if (player2X + fifty - ballX + 5 < 10) {
        player2Vel += 5;
      }
    }

    player1X = min(max(player1X + player1Vel, 0), width - playerWidth);
    player2X = min(max(player2X + player2Vel, 0), width - playerWidth);
    collision();

    ballX += ballVelX;
    ballY += ballVelY;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#000";
    context.fillRect(player1X, 0, playerWidth, ten);
    context.fillRect(player2X, height - 20, playerWidth, ten);
    context.fillRect(ballX, ballY, ballDim, ballDim);
    context.fillStyle = "#777";

    context.fillText(p1, width / 2 - ten, hundred, hundred);
    context.fillText(p2, width / 2 - ten, height - hundred);
    player1Vel = player2Vel = 0;
    last = now;
  }
  raf(s);
};
raf(s);
