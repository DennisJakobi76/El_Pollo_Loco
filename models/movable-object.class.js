class MovableObject extends DrawableObject {
    /**
     * Creates a new MovableObject.
     * @param {number} speed - The speed at which the object moves.
     * @param {boolean} otherDirection - Whether the object should move in the opposite direction.
     * @param {number} fallSpeed - The object's initial falling speed.
     * @param {number} fallAcceleration - The object's falling acceleration.
     * @param {number} energy - The object's energy.
     * @param {number} lastHit - The last time the object was hit.
     * @param {number} currentImage - The index of the current image in the animation.
     * @param {boolean} startedAnimationOnce - Whether the object has started an animation once.
     * @param {Object} offset - An object containing the object's offset in pixels.
     * @param {number} offset.top - The object's top offset.
     * @param {number} offset.bottom - The object's bottom offset.
     * @param {number} offset.left - The object's left offset.
     * @param {number} offset.right - The object's right offset.
     */
    constructor() {
        super();
        this.speed = 0.15;
        this.otherDirection = false;
        this.fallSpeed = 0;
        this.fallAcceleration = 1;
        this.energy = 100;
        this.lastHit = 0;
        this.currentImage = 0;
        this.startedAnimationOnce = false;
        this.offset = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };
    }

    /**
     * Moves the object to the right by increasing its x position
     * by the value of its speed property.
     */

    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x position
     * by the value of its speed property.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation in an infinite loop by continuously
     * switching through the images in the provided array.
     * The animation is played by setting the object's img property
     * to the current image in the array, and increasing the currentImage
     * property by one. The current image is determined by the object's
     * currentImage property modulo the length of the array.
     * @param {Array<string>} array - The array of image paths to play the
     * animation with.
     */
    playAnimationInfinite(array) {
        let index = this.currentImage % array.length;
        let path = array[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation once by switching through the images in the provided array.
     * The animation is played by setting the object's img property to the current image
     * in the array, and increasing the currentImage property by one. The current image
     * is determined by the object's currentImage property modulo the length of the array.
     * The animation will not be repeated after it has finished playing once.
     * @param {Array<string>} array - The array of image paths to play the animation with.
     */
    playAnimationOnce(array) {
        if (!this.startedAnimationOnce) {
            this.currentImage = 0;
            this.startedAnimationOnce = true;
        }
        if (this.currentImage >= array.length) {
            this.startedAnimationOnce = false;
        }
        if (this.currentImage < array.length) {
            this.img = this.imageCache[array[this.currentImage]];
            this.currentImage++;
        }
    }

    /**
     * Applies gravity to the object by decreasing its y position
     * by the value of its fallSpeed property and increasing its fallSpeed
     * by the value of its fallAcceleration property. This is done in an
     * interval of 1000 / 40 milliseconds.
     * If the object is above the ground or its fallSpeed is not negative,
     * the object's y position is decreased and its fallSpeed is increased.
     * If the object is not above the ground and its fallSpeed is negative,
     * the object's fallSpeed is reset to 0.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.fallSpeed >= 0) {
                this.y -= this.fallSpeed;
                this.fallSpeed -= this.fallAcceleration;
            }
            if (!this.isAboveGround() && this.fallSpeed < 0) {
                this.fallSpeed = 0;
            }
        }, 1000 / 40);
    }

    /**
     * Checks if the object is above the ground.
     *
     * For instances of ThrowableObject, it checks if the y position is less than 365.
     * For all other objects, it checks if the y position is less than 180.
     *
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 365;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     *
     * The collision is detected by comparing the boundaries of the two objects.
     * It checks if any side of this object overlaps with the corresponding side of the other object.
     *
     * @param {MovableObject} movableObject - The other movable object to check collision with.
     * @returns {boolean} True if the two objects are colliding, otherwise false.
     */

    isColliding(movableObject) {
        return (
            this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left && // R -> L
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top && // T -> B
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right && // L -> R
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom // B -> T
        );
    }

    /**
     * Checks if the movable object is dead.
     *
     * @returns {boolean} True if the movable object's energy is less than or equal to 0, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Reduces the energy of the movable object by 20.
     * If the movable object is already hurt, this function does nothing.
     * If the movable object's energy reaches 0 or below, it is considered dead.
     * The last hit time is stored as the current time.
     */
    hit() {
        if (this.isHurt()) return;
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Determines if the movable object is currently hurt.
     * An object is considered hurt if the time passed since the last hit is less than 0.62 seconds.
     * This is calculated based on the difference between the current time and the time of the last hit.
     *
     * @returns {boolean} True if the object is hurt, otherwise false.
     */

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 0.62;
    }

    /**
     * Checks if the movable object is waiting.
     * A movable object is waiting if all keyboard buttons are not pressed.
     * This is useful for determining if the character is idle or not.
     *
     * @returns {boolean} True if the movable object is waiting, otherwise false.
     */
    isWaiting() {
        if (!this.world.keyboard.SPACE && !this.world.keyboard.UP && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.DOWN && !this.world.keyboard.D) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Ends all intervals currently stored in the intervalIds array.
     * This is useful for clearing all animations and movements of all objects in the game.
     */
    endAllIntervals() {
        intervalIds.forEach((interval) => {
            clearInterval(interval);
        });
    }
    /**
     * Resets the idle timer for the movable object.
     * This function updates the idle start time to the current time, effectively resetting the timer.
     * It also pauses the snoring sound, indicating that the object is no longer idle.
     */

    resetIdleTimer() {
        this.idleStartTime = Date.now();
        snoringSound.pause();
    }
}
