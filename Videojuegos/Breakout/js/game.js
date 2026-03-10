const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let rows = parseInt(prompt("Ingresa el número de filas de bloques (ej. 5):", 5));
let cols = parseInt(prompt("Ingresa el número de columnas de bloques (ej. 8):", 8));
if (isNaN(rows) || rows < 1) rows = 5;
if (isNaN(cols) || cols < 1) cols = 8;

let score = 0;
let lives = 3;
let timerStarted = false;
let startTime = 0;
const timerElement = document.getElementById("timer");

const paddle = new Paddle(canvas.width/2 - 50, canvas.height - 30, 100, 20, 7);
const ball = new Ball(canvas.width/2, canvas.height/2, 10, 4, -4);

const blockWidth = 80;
const blockHeight = 20;
const blocks = [];
const colors = ["#0b1a3f","#1f2b5a","#3a4978","#7f7f7f","#bfbfbf","#ffffff"];

for (let r=0; r<rows; r++) {
    for (let c=0; c<cols; c++) {
        const x = c * (blockWidth + 10) + 35;
        const y = r * (blockHeight + 10) + 50;
        const color = colors[r % colors.length];
        blocks.push(new Block(x, y, blockWidth, blockHeight, color));
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!timerStarted && (ball.speedX !== 0 || ball.speedY !== 0)) {
        timerStarted = true;
        startTime = Date.now();
    }

    paddle.update(canvas);
    paddle.draw(ctx);

    ball.update(canvas);
    ball.draw(ctx);

    for (let block of blocks) {
        if (!block.destroyed) {
            block.draw(ctx);

            if (ball.x + ball.radius > block.x &&
                ball.x - ball.radius < block.x + block.width &&
                ball.y + ball.radius > block.y &&
                ball.y - ball.radius < block.y + block.height) {
                
                ball.speedY *= -1;
                block.destroyed = true;
                score++;
                document.getElementById("score").innerText = "Bloques destruidos: " + score;

                if (score % 5 === 0) {
                    ball.speedX *= 1.2;
                    ball.speedY *= 1.2;
                }
            }
        }
    }

    if (ball.x + ball.radius > paddle.x &&
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y + ball.radius > paddle.y) {
        ball.speedY *= -1;
    }

    if (ball.y - ball.radius > canvas.height) {
        lives--;
        document.getElementById("lives").innerText = "Vidas: " + lives;
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.speedY = -4;
        ball.speedX = 4;
    }

    if (lives <= 0) {
        alert("GAME OVER");
        document.location.reload();
        return;
    }

    if (score === blocks.length) {
        const totalTime = Date.now() - startTime;
        const seconds = Math.floor(totalTime / 1000);
        const milliseconds = totalTime % 1000;
        alert(`¡GANASTE! Tiempo: ${seconds}:${milliseconds.toString().padStart(3,'0')} (s:ms)`);
        document.location.reload();
        return;
    }

    if (timerStarted) {
        const elapsed = Date.now() - startTime;
        const seconds = Math.floor(elapsed / 1000);
        const milliseconds = elapsed % 1000;
        timerElement.innerText = `${seconds}:${milliseconds.toString().padStart(3,'0')}`;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();