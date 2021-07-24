const BG_COLOR = "#231f20";
const SNAKE_COLOR = "#c2c2c2";
const FOOD_COLOR = "#e66916";

const gameScreen = document.getElementById("gameScreen");

let canvas, ctx;

const gameState = {
  player: {
    pos: {
      x: 3,
      y: 10,
    },
    vel: {
      x: 1,
      y: 0,
    },
    snake: [
      { x: 1, y: 10 },
      { x: 2, y: 10 },
      { x: 3, y: 10 },
    ],
  },
  food: {
    x: 7,
    y: 7,
  },
  gridSize: 20,
};

function keydownFunc(e) {
  console.log(e.keyCode);
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = canvas.height = 600;

  document.addEventListener("keydown", keydownFunc);

  paintGame(gameState);
}

function paintGame(state) {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const { player, food, gridSize } = state;
  const size = canvas.width / gridSize; //pixels per grid square on game screen

  paintFood(food, size, FOOD_COLOR);
  paintPlayer(player, size, SNAKE_COLOR);
}

function paintFood(foodState, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(foodState.x * size, foodState.y * size, size, size);
}

function paintPlayer(playerState, size, color) {
  ctx.fillStyle = color;
  for (const { x, y } of playerState.snake) {
    ctx.fillRect(x * size, y * size, size, size);
  }
}

init();
