class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    fallSpeed = 0;
    fallAcceleration = 1;
    energy = 100;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(array) {
        let index = this.currentImage % array.length;
        let path = array[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.fallSpeed > 0) {
                this.y -= this.fallSpeed;
                this.fallSpeed -= this.fallAcceleration;
            }
        }, 1000 / 40);
    }

    isAboveGround() {
        return this.y < 180;
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    isColliding(movableObject) {
        return (
            this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left && // R -> L
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top && // T -> B
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right && // L -> R
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom // B -> T
        );
    }

    isDead() {
        return this.energy == 0;
    }

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        }
    }
}
