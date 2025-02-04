class Snake {
  constructor() {
    this.reset();
  }

  reset() {
    this.body = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    this.direction = null;
    this.nextDirection = null;
  }

  changeDirection(newDirection) {
    const opposite = { up: "down", down: "up", left: "right", right: "left" };

    if (!this.direction) {
      this.direction = newDirection;
      this.nextDirection = newDirection;
    } else if (opposite[this.direction] !== newDirection) {
      this.nextDirection = newDirection;
    }
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.blockSize = 20;
    this.boardSize = 25;
    this.snake = new Snake();
    this.food = this.placeFood();
    this.foodEaten = 0;
    this.speed = 150;
    this.level = 1;
    this.running = false;
    this.intervalId = null;
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas.width = 500;
    this.canvas.height = 500;
  }

  start() {
    this.snake.reset();
    this.food = this.placeFood();
    this.foodEaten = 0;
    this.speed = 150;
    this.level = 1;
    this.running = false;

    document.querySelector(".game-over-container").style.display = "none";
    this.updateUI();
    this.draw();
  }

  startOnFirstMove(event) {
    if (!this.running && event.key === "ArrowRight") {
      this.running = true;
      this.intervalId = setInterval(() => this.update(), this.speed);
    }
  }

  placeFood() {
    return {
      x: Math.floor(Math.random() * this.boardSize),
      y: Math.floor(Math.random() * this.boardSize),
    };
  }

  update() {
    if (!this.snake.direction) return;

    this.snake.direction = this.snake.nextDirection;
    const head = { ...this.snake.body[0] };

    if (this.snake.direction === "right") head.x++;
    if (this.snake.direction === "left") head.x--;
    if (this.snake.direction === "up") head.y--;
    if (this.snake.direction === "down") head.y++;

    this.snake.body.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.foodEaten++;
      this.food = this.placeFood();
      if (this.foodEaten % 3 === 0) this.increaseSpeed();
      this.updateUI();
    } else {
      this.snake.body.pop();
    }

    if (this.isCollision(head)) {
      this.stop();
    }

    this.draw();
  }

  increaseSpeed() {
    if (this.speed > 100) {
      this.speed -= 20;
      this.level++;
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => this.update(), this.speed);
    }
  }

  isCollision(head) {
    return (
      head.x < 0 ||
      head.x >= this.boardSize ||
      head.y < 0 ||
      head.y >= this.boardSize ||
      this.snake.body
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y)
    );
  }

  stop() {
    clearInterval(this.intervalId);
    this.running = false;
    this.flashSnake(() => this.showGameOver());
  }

  flashSnake(callback) {
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (flashCount % 2 === 0) {
        this.draw();
      }
      flashCount++;
      if (flashCount > 5) {
        clearInterval(flashInterval);
        callback();
      }
    }, 200);
  }

  showGameOver() {
    document.querySelector(".game-container").style.display = "none";
    document.querySelector(".game-over-container").style.display = "flex";

    setTimeout(() => {
      document.querySelector(".game-over-container").style.display = "none";
      document.querySelector(".game-menu").style.display = "flex";
    }, 3000);
  }

  updateUI() {
    document.getElementById("score").innerText = this.foodEaten;
    document.getElementById("speed").innerText = this.level;
  }

  draw() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = "#fff83f";
    this.snake.body.forEach((segment) => {
      this.context.fillRect(
        segment.x * this.blockSize,
        segment.y * this.blockSize,
        this.blockSize - 2,
        this.blockSize - 2
      );
    });

    this.context.fillStyle = "#88c63f";
    this.context.fillRect(
      this.food.x * this.blockSize,
      this.food.y * this.blockSize,
      this.blockSize - 2,
      this.blockSize - 2
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("board");
  const game = new Game(canvas);

  document.addEventListener("keydown", (event) => {
    const directionKeys = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };

    if (directionKeys[event.key]) {
      game.snake.changeDirection(directionKeys[event.key]);
      game.startOnFirstMove(event);
    }
  });

  document.querySelector(".start-button").addEventListener("click", () => {
    document.querySelector(".game-container").style.display = "block";
    document.querySelector(".game-menu").style.display = "none";
    game.start();
  });

  game.start();
});
