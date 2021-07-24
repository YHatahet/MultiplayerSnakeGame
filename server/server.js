const io = require("socket.io")();
const { createGameState, gameLoop } = require("./game");
const { FRAME_RATE } = require("./constants");

// fixes CORS errors
io.opts = {
  cors: {
    // origin: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
  },
};

io.on("connection", (client) => {
  const state = createGameState();
  startGameInterval(client, state);

  client.emit("init", { data: "hello world" });
});

function startGameInterval(client, state) {
  const intervalId = setInterval(() => {
    // gets the winner of the game in that frame.
    // returns 0 if no winners yet, otherwise the ID of the winner
    const winner = gameLoop(state);

    if (winner === 0) {
      client.emit("gameState", JSON.stringify(state));
    } else {
      client.emit("gameOver");
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

io.listen(3000);
