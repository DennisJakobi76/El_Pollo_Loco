class Character extends MovableObject {
    IMAGES_THROWING = ["./assets/img/2_character_pepe/2_walk/W-22.png"];

    IMAGES_WALKING = [
        "./assets/img/2_character_pepe/2_walk/W-21.png",
        "./assets/img/2_character_pepe/2_walk/W-22.png",
        "./assets/img/2_character_pepe/2_walk/W-23.png",
        "./assets/img/2_character_pepe/2_walk/W-24.png",
        "./assets/img/2_character_pepe/2_walk/W-25.png",
        "./assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
        "./assets/img/2_character_pepe/3_jump/J-31.png",
        "./assets/img/2_character_pepe/3_jump/J-32.png",
        "./assets/img/2_character_pepe/3_jump/J-33.png",
        "./assets/img/2_character_pepe/3_jump/J-34.png",
        "./assets/img/2_character_pepe/3_jump/J-35.png",
        "./assets/img/2_character_pepe/3_jump/J-36.png",
        "./assets/img/2_character_pepe/3_jump/J-37.png",
        "./assets/img/2_character_pepe/3_jump/J-38.png",
        "./assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_IDLE = [
        "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_LONG_IDLE = [
        "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_DEAD = [
        "./assets/img/2_character_pepe/5_dead/D-51.png",
        "./assets/img/2_character_pepe/5_dead/D-52.png",
        "./assets/img/2_character_pepe/5_dead/D-53.png",
        "./assets/img/2_character_pepe/5_dead/D-54.png",
        "./assets/img/2_character_pepe/5_dead/D-55.png",
        "./assets/img/2_character_pepe/5_dead/D-56.png",
        "./assets/img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = ["./assets/img/2_character_pepe/4_hurt/H-41.png", "./assets/img/2_character_pepe/4_hurt/H-42.png", "./assets/img/2_character_pepe/4_hurt/H-43.png"];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.height;
        this.width;
        this.y;
        this.speed = 10;
        this.idleStartTime = Date.now();
        this.died = false;
        this.jumpAttacks = false;
        this.throws = false;
        this.world;
        this.offset = {
            top: 100,
            bottom: 10,
            left: 26,
            right: 26,
        };
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
        this.playIdleAnimation();
        this.playThrowingAnimation();
    }

    checkAndPlayMovementAnimation() {
        let characterCheckAnimationInterval = setInterval(() => {
            this.checkCharacterJumpAttacks();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                runningSound.play();
                if (this.isAboveGround()) {
                    runningSound.pause();
                }
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > -610) {
                this.otherDirection = true;
                runningSound.play();
                this.moveLeft();
            }
            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
                runningSound.pause();
                characterJumpSound.play();
                this.jump();
            }
            if (this.world.keyboard.D) {
                this.throws = true;
            }
            if (!this.world.keyboard.D) {
                this.throws = false;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        intervalIds.push(characterCheckAnimationInterval);
    }

    jump() {
        this.fallSpeed = 20;
        this.resetIdleTimer();
    }

    checkCharacterJumpAttacks() {
        if (this.y > -20 && this.fallSpeed < 0) {
            this.jumpAttacks = true;
        } else {
            this.jumpAttacks = false;
        }
        return this.jumpAttacks;
    }

    playWalkingAnimation() {
        let characterWalkingInterval = setInterval(() => {
            if (!this.isAboveGround() && !this.isDead()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimationInfinite(this.IMAGES_WALKING);
                    this.resetIdleTimer();
                }
            }
        }, 100);
        intervalIds.push(characterWalkingInterval);
    }

    playJumpingAnimation() {
        let characterJumpingInterval = setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimationOnce(this.IMAGES_JUMPING);
                this.resetIdleTimer();
            }
        }, 150);
        intervalIds.push(characterJumpingInterval);
    }

    isThrowing() {
        return this.throws;
    }

    playThrowingAnimation() {
        let characterThrowingInterval = setInterval(() => {
            if (this.isThrowing()) {
                this.playAnimationOnce(this.IMAGES_THROWING);
                this.resetIdleTimer();
            }
        }, 100);
        intervalIds.push(characterThrowingInterval);
    }

    playHurtAnimation() {
        let characterHurtInterval = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimationInfinite(this.IMAGES_HURT);
                this.resetIdleTimer();
            }
        }, 100);
        intervalIds.push(characterHurtInterval);
    }

    playDyingAnimation() {
        let characterDyingInterval = setInterval(() => {
            if (this.isDead() && !this.died) {
                runningSound.pause();
                snoringSound.pause();
                characterDyingSound.play();
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.resetIdleTimer();
                setTimeout(() => {
                    characterDeadSound.play();
                }, 1000);

                setTimeout(() => {
                    gameMusic.pause();
                    runningSound.pause();
                    snoringSound.pause();
                    this.died = true;
                    this.img.src = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
                    this.endAllIntervals();
                }, 800);

                setTimeout(() => {
                    document.getElementById("canvas").classList.add("d-none");
                    document.getElementById("end-screen-wrapper").classList.remove("d-none");
                    document.getElementById("game-over-img").src = "./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png";
                    deadScreenSound.play();
                }, 5500);
            }
        }, 150);
        intervalIds.push(characterDyingInterval);
    }

    playIdleAnimation() {
        let idleTimeout = 10 * 1000;
        let characterIdleInterval = setInterval(() => {
            if (!this.isAboveGround() && !this.isDead() && !this.isHurt() && this.isWaiting()) {
                runningSound.pause();
                if (Date.now() - this.idleStartTime < idleTimeout) {
                    this.playAnimationInfinite(this.IMAGES_IDLE);
                } else {
                    snoringSound.play();
                    this.playAnimationInfinite(this.IMAGES_LONG_IDLE);
                }
            }
        }, 160);
        intervalIds.push(characterIdleInterval);
    }
}
