// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true; // New property to check if the ball is "alive"
  }
  }

  draw() {
    if (this.exists) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
 update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}
// EvilCircle class
class EvilCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = 20;
    this.velY = 20;
    this.color = "white";
    this.size = 10;

    window.addEventListener("keydown", (e) => this.setControls(e));
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
setControls(e) {
    if (e.key === "ArrowUp") {
      this.y -= this.velY;
    } else if (e.key === "ArrowDown") {
      this.y += this.velY;
    } else if (e.key === "ArrowLeft") {
      this.x -= this.velX;
    } else if (e.key === "ArrowRight") {
      this.x += this.velX;
    }
  }
 checkBounds() {
    if (this.x - this.size < 0) {
      this.x = this.size;
    }
    if (this.x + this.size > width) {
      this.x = width - this.size;
    }
    if (this.y - this.size < 0) {
      this.y = this.size;
    }
    if (this.y + this.size > height) {
      this.y = height - this.size;
    }
  }
 collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false; // "Eat" the ball
        }
      }
    }
  }
}
// Initialize balls
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}
// Initialize EvilCircle
const evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }
  
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  
if (balls.some((ball) => ball.exists)) {
    requestAnimationFrame(loop); // Keep looping if balls remain
  } else {
    ctx.fillStyle = "white";
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("All balls eaten!", width / 2, height / 2);
  }
}

loop();
