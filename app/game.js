const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player, obstacle, gameOver;

function resetGame() {
  player = {
    x: 50,
    y: 220,
    w: 30,
    h: 30,
    vy: 0,
    jumping: false
  };

  obstacle = {
    x: 800,
    y: 240,
    w: 20,
    h: 40,
    speed: 6
  };

  gameOver = false;
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" && !player.jumping) {
    player.vy = -12;
    player.jumping = true;
  }
  if (gameOver) resetGame();
});

function update() {
  if (gameOver) return;

  // gravity
  player.vy += 0.6;
  player.y += player.vy;

  if (player.y >= 220) {
    player.y = 220;
    player.vy = 0;
    player.jumping = false;
  }

  obstacle.x -= obstacle.speed;
  if (obstacle.x < -obstacle.w) obstacle.x = 800;

  // collision
  if (
    player.x < obstacle.x + obstacle.w &&
    player.x + player.w > obstacle.x &&
    player.y < obstacle.y + obstacle.h &&
    player.y + player.h > obstacle.y
  ) {
    gameOver = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ground
  ctx.fillStyle = "#555";
  ctx.fillRect(0, 260, 800, 40);

  // player
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // obstacle
  ctx.fillStyle = "#E53935";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText("GAME OVER - press any key", 250, 150);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

resetGame();
loop();

