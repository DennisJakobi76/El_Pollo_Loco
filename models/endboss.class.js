class Endboss extends MovableObject {
    IMAGES_ALERT = [
        "../assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_WALKING = [
        "../assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "../assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "../assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "../assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ATTACKING = [
        "../assets/img/4_enemie_boss_chicken/3_attack/G13.png",
        "../assets/img/4_enemie_boss_chicken/3_attack/G14.png",
        "../assets/img/4_enemie_boss_chicken/3_attack/G15.png",
        "../assets/img/4_enemie_boss_chicken/3_attack/G16.png",
        "../assets/img/4_enemie_boss_chicken/3_attack/G17.png",
        "../assets/img/4_enemie_boss_chicken/3_attack/G18.png",
        "../assets/img/4_enemie_boss_chicken/3_attack/G19.png",
        "../assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_DEAD = ["../assets/img/4_enemie_boss_chicken/5_dead/G24.png", "../assets/img/4_enemie_boss_chicken/5_dead/G25.png", "../assets/img/4_enemie_boss_chicken/5_dead/G26.png"];

    IMAGES_HURT = ["../assets/img/4_enemie_boss_chicken/4_hurt/G21.png", "../assets/img/4_enemie_boss_chicken/4_hurt/G22.png", "../assets/img/4_enemie_boss_chicken/4_hurt/G23.png"];

    offset = {
        top: 70,
        bottom: 20,
        left: 10,
        right: 10,
    };

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.height = 400;
        this.width = 280;
        this.x = 4000;
        this.y = 56;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
    }

    animate() {
        // this.moveLeft();
        setInterval(() => {
            this.playAnimationInfinite(this.IMAGES_ALERT);
        }, 200);
    }
}
