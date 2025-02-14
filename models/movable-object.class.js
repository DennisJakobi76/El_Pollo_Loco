class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    fallSpeed = 0;
    fallAcceleration = 1;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimationInfinite(array) {
        let index = this.currentImage % array.length;
        let path = array[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(array) {
        if (this.currentImage < array.length) {
            this.img = this.imageCache[array[this.currentImage]];
            this.currentImage++;
        } else {
            this.currentImage = 0;
        }
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
        if (this instanceof ThrowableObject) {
            return this.y < 365;
        } else {
            return this.y < 180;
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
        return this.energy <= 0;
    }

    hit() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 0.62;
    }

    isWaiting() {
        if (!this.world.keyboard.SPACE && !this.world.keyboard.UP && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.DOWN && !this.world.keyboard.D) {
            return true;
        } else {
            return false;
        }
    }

    resetIdleTimer() {
        this.idleStartTime = Date.now();
    }
}
