class Snake {
  constructor() {
    this.body = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    this.direction = "right";
  }

  changeDirection(newDirection) {
    const oppositeDirections = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    if (oppositeDirections[this.direction] !== newDirection) {
      this.direction = newDirection;
    }
  }
}

class Apple {
  constructor() {
    this.x = Math.floor(Math.random() * 16);
    this.y = Math.floor(Math.random() * 16);
  }

  reposition() {
    this.x = Math.floor(Math.random() * 16);
    this.y = Math.floor(Math.random() * 16);
  }
}

class Game {
  constructor(canvas, snake, apple) {
    this.canvas = canvas;
    this.snake = snake;
    this.apple = apple;
    this.context = canvas.getContext("2d");
    this.scale = canvas.width / 16;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.update();
      this.draw();
    }, 100);
  }

  stop() {
    clearInterval(this.intervalId);
    alert("Game Over");
  }

  update() {
    const head = this.snake.body[0];
    const newHead = { x: head.x, y: head.y };

    if (this.snake.direction === "right") newHead.x += 1;
    if (this.snake.direction === "left") newHead.x -= 1;
    if (this.snake.direction === "up") newHead.y -= 1;
    if (this.snake.direction === "down") newHead.y += 1;

    this.snake.body.unshift(newHead);

    if (newHead.x === this.apple.x && newHead.y === this.apple.y) {
      this.apple.reposition();
    } else {
      this.snake.body.pop();
    }

    if (newHead.x < 0 || newHead.x >= 16 || newHead.y < 0 || newHead.y >= 16) {
      this.stop();
    }

    for (let i = 1; i < this.snake.body.length; i++) {
      if (
        newHead.x === this.snake.body[i].x &&
        newHead.y === this.snake.body[i].y
      ) {
        this.stop();
      }
    }
  }

  draw() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = "#fff";
    this.snake.body.forEach((segment) => {
      this.context.fillRect(
        segment.x * this.scale,
        segment.y * this.scale,
        this.scale,
        this.scale
      );
    });

    this.context.fillStyle = "#f00";
    this.context.fillRect(
      this.apple.x * this.scale,
      this.apple.y * this.scale,
      this.scale,
      this.scale
    );
  }
}

// Setup game
const startButton = document.querySelector(".start-button");

const canvas = document.getElementById("board");
canvas.width = 512;
canvas.height = 512;
const snake = new Snake();
const apple = new Apple();
const game = new Game(canvas, snake, apple);

// Start the game
// game.start();

startButton.addEventListener("click", () => {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.style.display = "block";
  startButton.style.display = "none";
  game.start();
});

// Add key listener for direction changes
document.addEventListener("keydown", (event) => {
  const directionKeys = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  const newDirection = directionKeys[event.key];
  if (newDirection) {
    snake.changeDirection(newDirection);
  }
});
