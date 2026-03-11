"use strict";

class Ball {

    constructor(x, y, width, height, color) {

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.color = color;

        this.speedX = 4;
        this.speedY = -4;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);

        ctx.fill();
    }

    update(canvas) {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0) {
            this.speedY *= -1;
        }
    }
}