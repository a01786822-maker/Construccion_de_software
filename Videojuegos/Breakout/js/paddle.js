"use strict";

class Paddle {

    constructor(x, y, width, height, color) {

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.color = color;

        this.speed = 7;

        this.moveLeft = false;
        this.moveRight = false;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(canvas) {

        if (this.moveLeft && this.x > 0) {
            this.x -= this.speed;
        }

        if (this.moveRight && this.x + this.width < canvas.width) {
            this.x += this.speed;
        }
    }
}