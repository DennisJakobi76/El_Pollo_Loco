class Character extends MovableObject {
    height;
    width;
    y;
    speed = 10;
    IMAGES_WALKING = [
        "../assets/img/2_character_pepe/2_walk/W-21.png",
        "../assets/img/2_character_pepe/2_walk/W-22.png",
        "../assets/img/2_character_pepe/2_walk/W-23.png",
        "../assets/img/2_character_pepe/2_walk/W-24.png",
        "../assets/img/2_character_pepe/2_walk/W-25.png",
        "../assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
        "../assets/img/2_character_pepe/3_jump/J-31.png",
        "../assets/img/2_character_pepe/3_jump/J-32.png",
        "../assets/img/2_character_pepe/3_jump/J-33.png",
        "../assets/img/2_character_pepe/3_jump/J-34.png",
        "../assets/img/2_character_pepe/3_jump/J-35.png",
        "../assets/img/2_character_pepe/3_jump/J-36.png",
        "../assets/img/2_character_pepe/3_jump/J-37.png",
        "../assets/img/2_character_pepe/3_jump/J-38.png",
        "../assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_IDLE = [
        "../assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "../assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_LONG_IDLE = [
        "../assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "../assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_DEAD = [
        "../assets/img/2_character_pepe/5_dead/D-51.png",
        "../assets/img/2_character_pepe/5_dead/D-52.png",
        "../assets/img/2_character_pepe/5_dead/D-53.png",
        "../assets/img/2_character_pepe/5_dead/D-54.png",
        "../assets/img/2_character_pepe/5_dead/D-55.png",
        "../assets/img/2_character_pepe/5_dead/D-56.png",
        "../assets/img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = ["../assets/img/2_character_pepe/4_hurt/H-41.png", "../assets/img/2_character_pepe/4_hurt/H-42.png", "../assets/img/2_character_pepe/4_hurt/H-43.png"];

    world;

    offset = {
        top: 100,
        bottom: 10,
        left: 26,
        right: 26,
    };

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.height = 250;
        this.width = 124;
        this.y = 80 - 100;
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.checkAndPlayMovementAnimation();
        this.playWalkingAnimation();
        this.playJumpingAnimation();
        this.playHurtAnimation();
        this.playDyingAnimation();
    }

    checkAndPlayMovementAnimation() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > -610) {
                this.otherDirection = true;
                this.moveLeft();
            }
            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    jump() {
        this.fallSpeed = 20;
    }

    playWalkingAnimation() {
        setInterval(() => {
            if (!this.isAboveGround() && !this.isDead()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimationInfinite(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    playJumpingAnimation() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimationOnce(this.IMAGES_JUMPING);
            }
        }, 150);
    }

    playHurtAnimation() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimationInfinite(this.IMAGES_HURT);
            }
        }, 100);
    }

    playDyingAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DEAD);
            }
        }, 120);
    }
}
