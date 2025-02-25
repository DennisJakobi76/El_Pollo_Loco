class Chicken extends MovableObject {
    IMAGES_WALKING = [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.height = 72;
        this.width = 72;
        this.x = 400 + Math.random() * 1000 * chickenCounter * 5;
        this.y = 362;
        this.speed = 0.15 + Math.random() * 0.75;
        this.killed = false;
        this.dyingAnimationCounter = 0;
        this.animationIntervals = [];
        this.offset = {
            top: 2,
            bottom: 5,
            left: 0,
            right: 0,
        };

        this.animate();
    }

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

    stopAnimation() {
        this.animationIntervals.forEach((interval) => {
            clearInterval(interval);
        });
    }

    playChickenDyingAnimation() {
        this.img.src = this.IMAGES_DEAD[0];
    }
}
