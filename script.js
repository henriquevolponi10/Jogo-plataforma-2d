const player = document.querySelector(".player");
const platform = document.querySelector(".platform");

const GRAVITY = 0.5;
const JUMP_FORCE = -8;

let playerY = 100;
let playerVX = 0;
let playerVY = 0;

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function update() {
  playerVY += GRAVITY;
  playerY += playerVY;

  // Colisão com o chão
  if (playerY + player.offsetHeight >= window.innerHeight) {
    playerY = window.innerHeight - player.offsetHeight;
    playerVY = 0;
  }

  // Controle do jogador
  if (keys["ArrowLeft"]) {
    playerVX -= 2;
  } else if (keys["ArrowRight"]) {
    playerVX += 2;
  }

  if (keys["ArrowUp"] && playerVY === 0) {
    playerVY = JUMP_FORCE;
  }

  player.style.top = `${playerY}px`;

  // Detecção de colisão com a plataforma
  if (
    player.getBoundingClientRect().left + player.offsetWidth >
      platform.getBoundingClientRect().left &&
    player.getBoundingClientRect().left <
      platform.getBoundingClientRect().left + platform.offsetWidth &&
    player.getBoundingClientRect().bottom > platform.getBoundingClientRect().top &&
    player.getBoundingClientRect().top <
      platform.getBoundingClientRect().top + platform.offsetHeight
  ) {
    playerY = platform.getBoundingClientRect().top - player.offsetHeight;
    playerVY = 0;
  }
}

setInterval(update, 1000 / 60);

