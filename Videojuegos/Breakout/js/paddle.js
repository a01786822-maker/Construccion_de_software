class Paddle {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.moveLeft = false;
        this.moveRight = false;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
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


window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") paddle.moveLeft = true;
    if (e.key === "ArrowRight") paddle.moveRight = true;
});
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") paddle.moveLeft = false;
    if (e.key === "ArrowRight") paddle.moveRight = false;
});