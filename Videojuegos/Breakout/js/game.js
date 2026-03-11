"use strict";

const canvasWidth = 800;
const canvasHeight = 600;

let ctx;
let game;
let canvas;

class Game {

    constructor() {

        this.score = 0;
        this.lives = 3;

        this.timerStarted = false;
        this.startTime = 0;
        this.timerElement = document.getElementById("timer");

        this.initObjects();
        this.createEventListeners();
    }

    initObjects() {

        let rows = parseInt(prompt("Ingresa el número de filas de bloques (ej. 5):", 5));
        let cols = parseInt(prompt("Ingresa el número de columnas de bloques (ej. 8):", 8));

        if (isNaN(rows) || rows < 1) rows = 5;
        if (isNaN(cols) || cols < 1) cols = 8;

        this.totalBlocks = rows * cols;

        this.paddle = new Paddle(
            canvasWidth / 2 - 50,
            canvasHeight - 30,
            100,
            20,
            "white"
        );

        this.ball = new Ball(
            canvasWidth / 2,
            canvasHeight / 2,
            20,
            20,
            "white"
        );

        this.actors = [];

        const blockWidth = 80;
        const blockHeight = 20;

        const colors = ["#0b1a3f","#1f2b5a","#3a4978","#7f7f7f","#bfbfbf","#ffffff"];

        for (let r = 0; r < rows; r++) {

            for (let c = 0; c < cols; c++) {

                const x = c * (blockWidth + 10) + 35;
                const y = r * (blockHeight + 10) + 50;

                const block = new Block(
                    x,
                    y,
                    blockWidth,
                    blockHeight,
                    colors[r % colors.length]
                );

                this.actors.push(block);
            }
        }
    }

    draw(ctx) {

        for (let actor of this.actors) {
            actor.draw(ctx);
        }

        this.paddle.draw(ctx);
        this.ball.draw(ctx);
    }

    update() {

        if (!this.timerStarted) {
            this.timerStarted = true;
            this.startTime = Date.now();
        }

        this.paddle.update(canvas);
        this.ball.update(canvas);

        // colisión paddle
        if (
            this.ball.x > this.paddle.x &&
            this.ball.x < this.paddle.x + this.paddle.width &&
            this.ball.y > this.paddle.y
        ) {
            this.ball.speedY *= -1;
        }

        // colisión bloques
        for (let block of this.actors) {

            if (!block.destroyed) {

                if (
                    this.ball.x > block.x &&
                    this.ball.x < block.x + block.width &&
                    this.ball.y > block.y &&
                    this.ball.y < block.y + block.height
                ) {

                    block.destroyed = true;

                    this.ball.speedY *= -1;

                    this.score++;

                    document.getElementById("score").innerText =
                        "Bloques destruidos: " + this.score;

                    if (this.score % 5 === 0) {
                        this.ball.speedX *= 1.2;
                        this.ball.speedY *= 1.2;
                    }
                }
            }
        }

        // 🏆 VICTORIA
        if (this.score === this.totalBlocks) {

            const totalTime = Date.now() - this.startTime;

            const seconds = Math.floor(totalTime / 1000);
            const milliseconds = totalTime % 1000;

            alert(
                "¡VICTORY!\n\nTiempo: " +
                seconds + ":" +
                milliseconds.toString().padStart(3,'0') +
                " (s:ms)"
            );

            location.reload();
        }

        // perder vida
        if (this.ball.y > canvasHeight) {

            this.lives--;

            document.getElementById("lives").innerText =
                "Vidas: " + this.lives;

            this.ball.x = canvasWidth / 2;
            this.ball.y = canvasHeight / 2;
            this.ball.speedX = 4;
            this.ball.speedY = -4;
        }

        if (this.lives <= 0) {

            alert("GAME OVER");
            location.reload();
        }

        // cronómetro
        if (this.timerStarted) {

            const elapsed = Date.now() - this.startTime;

            const seconds = Math.floor(elapsed / 1000);
            const milliseconds = elapsed % 1000;

            this.timerElement.innerText =
                seconds + ":" + milliseconds.toString().padStart(3,'0');
        }
    }

    createEventListeners() {

        window.addEventListener("keydown", (event) => {

            if (event.key == "ArrowLeft") {
                this.paddle.moveLeft = true;
            }

            if (event.key == "ArrowRight") {
                this.paddle.moveRight = true;
            }
        });

        window.addEventListener("keyup", (event) => {

            if (event.key == "ArrowLeft") {
                this.paddle.moveLeft = false;
            }

            if (event.key == "ArrowRight") {
                this.paddle.moveRight = false;
            }
        });
    }
}

function main() {

    canvas = document.getElementById("canvas");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx = canvas.getContext("2d");

    game = new Game();

    drawScene();
}

function drawScene() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update();
    game.draw(ctx);

    requestAnimationFrame(drawScene);
}