class SmallChicken extends Chicken {
    IMAGES_WALKING = [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = ["./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    /**
     * Creates a new instance of SmallChicken.
     * @constructor
     * @this {SmallChicken}
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.offset = {
            top: 2,
            bottom: 4,
            left: 4,
            right: 4,
        };
        this.height = 48;
        this.width = 48;
        this.x = 600 + Math.random() * 1000 * chickenCounter * 4;
        this.y = 384;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
    }
}
