class Endboss extends MovableObject {
    IMAGES_ALERT = [
        "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_WALKING = [
        "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ATTACKING = [
        "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_DEAD = ["./assets/img/4_enemie_boss_chicken/5_dead/G24.png", "./assets/img/4_enemie_boss_chicken/5_dead/G25.png", "./assets/img/4_enemie_boss_chicken/5_dead/G26.png"];

    IMAGES_HURT = ["./assets/img/4_enemie_boss_chicken/4_hurt/G21.png", "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png", "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png"];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.offset = {
            top: 70,
            bottom: 20,
            left: 22,
            right: 10,
        };
        this.height = 400;
        this.width = 280;
        this.x = 4000;
        this.y = 56;
        this.killed = false;
        this.speed = 5;
        this.nearCharacter = false;
        this.notCloseEnoughToAttackCharacter = false;
        this.characterInAttackRange = false;
        this.characterIsBehindEndboss = false;
        this.bossIntervals = [];
        this.animate();
    }

    animate() {
        this.playBossAlertAnimation();
        this.playBossHurtAnimation();
        this.playBossDyingAnimation();
        this.playBossWalkingAnimation();
        this.playBossAttackingAnimation();
    }

    playBossAlertAnimation() {
        let endbossAlertInterval = setInterval(() => {
            if (this.nearCharacter) {
                this.playAnimationInfinite(this.IMAGES_ALERT);
            }
        }, 200);
        intervalIds.push(endbossAlertInterval);
        this.bossIntervals.push(endbossAlertInterval);
    }

    playBossHurtAnimation() {
        let bossHurtInterval = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimationInfinite(this.IMAGES_HURT);
                this.resetIdleTimer();
            }
        }, 100);
        intervalIds.push(bossHurtInterval);
        this.bossIntervals.push(bossHurtInterval);
    }

    playBossDyingAnimation() {
        let BossDyingInterval = setInterval(() => {
            if (this.isDead() && !this.killed) {
                setTimeout(() => {
                    senioraGallinaDyingSound.play();
                }, 600);

                this.playAnimationOnce(this.IMAGES_DEAD);
                this.resetIdleTimer();
                setTimeout(() => {
                    this.killed = true;
                    this.img.src = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
                    this.endAllIntervals();
                    gameMusic.pause();
                }, 800);
                setTimeout(() => {
                    mexicanHatSound.play();
                }, 1600);
                setTimeout(() => {
                    document.getElementById("canvas").classList.add("d-none");
                    document.getElementById("end-screen-wrapper").classList.remove("d-none");
                    gameOverSound.play();
                }, 8000);
            }
        }, 50);

        intervalIds.push(BossDyingInterval);
        this.bossIntervals.push(BossDyingInterval);
    }

    playBossWalkingAnimation() {
        let bossWalkingInterval = setInterval(() => {
            if (this.notCloseEnoughToAttackCharacter && !this.isHurt() && !this.isDead()) {
                if (!this.characterIsBehindEndboss) {
                    this.playAnimationInfinite(this.IMAGES_WALKING);
                    this.moveLeft();
                } else {
                    this.playAnimationInfinite(this.IMAGES_WALKING);
                    this.moveRight();
                }
            }
        }, 100);
        intervalIds.push(bossWalkingInterval);
        this.bossIntervals.push(bossWalkingInterval);
    }

    playBossAttackingAnimation() {
        let bossAttackingInterval = setInterval(() => {
            if (this.characterInAttackRange) {
                this.playAnimationOnce(this.IMAGES_ATTACKING);
            }
        }, 100);
        intervalIds.push(bossAttackingInterval);
        this.bossIntervals.push(bossAttackingInterval);
    }

    endBossIntervals() {
        this.bossIntervals.forEach((interval) => {
            clearInterval(interval);
        });
    }
}
