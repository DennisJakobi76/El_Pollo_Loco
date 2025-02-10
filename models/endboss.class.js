class Endboss extends MovableObject {
    IMAGES_WALKING = [
        "../assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.height = 400;
        this.width = 280;
        this.x = 200 + Math.random() * 500;
        this.y = 480 - this.height * 1.062;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
    }

    animate() {
        // this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
