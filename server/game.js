const { GRID_SIZE } = require("./constants");

module.exports = {
  createGameState,
  gameLoop,
};

function createGameState() {
  return {
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
    gridSize: GRID_SIZE,
  };
}

function gameLoop(state) {
  if (!state) return;

  const playerOne = state.player;
  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  // within confines of the grid
  if (
    playerOne.pos.x < 0 ||
    playerOne.pos.x > GRID_SIZE ||
    playerOne.pos.y < 0 ||
    playerOne.pos.y > GRID_SIZE
  ) {
    return 2; // player 2 wins
  }

  // did snake eat?
  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    // push the head once to make it "grow" from the front
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    randomFood();
  }

  // if snake is moving
  if (playerOne.vel.x || playerOne.vel.y) {
    // if any cell is overlapping with the head of the snake
    for (const { x, y } of playerOne.snake) {
      if (x === playerOne.pos.x && y === playerOne.pos.y) {
        return 2;
      }
    }

    //TODO snake turn into a queue object
    // move the snake forward
    playerOne.snake.push({ ...playerOne.pos });
    // remove the tail
    playerOne.snake.shift();
  }

  // no one won
  return 0;
}

function randomFood(state) {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };

  //TODO implement reservoir sampling
  // check food isn't on top of snake
  for (const { x, y } of state.player.snake) {
    if (x === food.x && y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}
