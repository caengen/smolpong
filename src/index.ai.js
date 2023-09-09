var canvas = document.querySelector("canvas"),
  width = (canvas.width = this.innerWidth),
  height = (canvas.height = this.innerHeight),
  player1Vel = 0,
  player2Vel = 0,
  player1X = 0,
  player2X = 0,
  delta = 0,
  ballX = (ballX = width / 2 - 5),
  ballY = height / 2,
  ballVelX = new Date() & 1 ? 4 : -4,
  ballVelY = new Date() & 1 ? 4 : -4,
  p1 = 0,
  p2 = 0,
  hundred = 100,
  fifty = 50,
  ten = 10,
  fifteen = 15,
  min = Math.min,
  max = Math.max,
  raf = this.requestAnimationFrame,
  listener = this.addEventListener,
  context = canvas.getContext("2d");
player1X = player2X = ballX = width / 2 - fifty;
context.font = `40px Arial`;

listener("resize", () => {
  width = canvas.width = this.innerWidth;
  height = canvas.height = this.innerHeight;
});
let keyMap = {};
var keyboardListener = (e) => {
  keyMap[e.keyCode] = e.type == "keydown";

  console.log("keyMap in listener", keyMap);
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
  if (ballX > player1X && ballX < player1X + hundred && ballY <= ten)
    ballVelY = min(ballVelY * -1.1, ten);
  if (ballX > player2X && ballX < player2X + hundred && ballY >= height - 25)
    ballVelY = min(ballVelY * -1.1, ten);
};

let last = undefined;

let s = (now) => {
  if (!last) last = now;
  delta = now - last;
  if (delta > 1000 / 60) {
    console.log("keyMap in step", keyMap);
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

    player1X = min(max(player1X + player1Vel, 0), width - hundred);
    player2X = min(max(player2X + player2Vel, 0), width - hundred);
    collision();

    ballX += ballVelX;
    ballY += ballVelY;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#000";
    context.fillRect(player1X, 0, hundred, ten);
    context.fillRect(player2X, height - 20, hundred, ten);
    context.fillRect(ballX, ballY, ten, ten);
    context.fillStyle = "#777";
    context.fillText(p1, width / 2 - ten, hundred);
    context.fillText(p2, width / 2 - ten, height - hundred);
    player1Vel = player2Vel = 0;
    last = now;
  }
  raf(s);
};
raf(s);
