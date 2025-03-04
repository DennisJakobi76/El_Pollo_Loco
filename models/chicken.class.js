class Chicken extends MovableObject {
    killed = false;
    dyingAnimationCounter = 0;
    animationIntervals = [];
    offset = {
        top: 2,
        bottom: 5,
        left: 0,
        right: 0,
    };
    y = 362;
    height = 72;
    width = 72;

    IMAGES_WALKING = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD = ["./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    /**
     * Initializes a new Chicken instance with specific properties.
     * Loads the walking images and sets the initial position and speed.
     * Also initializes the state variables for tracking the chicken's
     * status and animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 1000 * chickenCounter * 5;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
    }

    /**
     * Animates the chicken by moving it to the left and playing the walking animation.
     * Sets an interval to continuously check and play the walking animation.
     * Resets the idle timer each time the animation is played.
     */
    animate() {
        let chickenMoveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        let chickenWalkInterval = setInterval(() => {
            this.playAnimationInfinite(this.IMAGES_WALKING);
        }, 100);
        intervalIds.push(chickenMoveLeftInterval);
        intervalIds.push(chickenWalkInterval);
        this.animationIntervals.push(chickenMoveLeftInterval);
        this.animationIntervals.push(chickenWalkInterval);
    }

    /**
     * Stops the chicken's animation by clearing all intervals related to the chicken's animation.
     * This method is used when the chicken is killed to stop the chicken from moving and playing the walking animation.
     */
    stopAnimation() {
        this.animationIntervals.forEach((interval) => {
            clearInterval(interval);
        });
    }

    /**
     * Plays the chicken's dying animation by setting the chicken's image to the first frame of the dying animation.
     * This method is used when the chicken is killed to play the dying animation.
     */
    playChickenDyingAnimation() {
        this.img.src = this.IMAGES_DEAD[0];
    }
}
