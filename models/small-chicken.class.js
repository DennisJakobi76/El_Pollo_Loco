class SmallChicken extends MovableObject {
    IMAGES_WALKING = [
        "../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = ["../assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    offset = {
        top: 2,
        bottom: 4,
        left: 4,
        right: 4,
    };

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.height = 48;
        this.width = 48;
        this.x = 600 + Math.random() * 1000 * chickenCounter * 4;
        this.y = 384;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
    }

    animate() {
        let smallChickenMovelLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        let smallChickenWalkInterval = setInterval(() => {
            this.playAnimationInfinite(this.IMAGES_WALKING);
        }, 100);
        intervalIds.push(smallChickenMovelLeftInterval);
        intervalIds.push(smallChickenWalkInterval);
    }
}
