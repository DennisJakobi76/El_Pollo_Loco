class Endboss extends MovableObject {
    offset = {
        top: 70,
        bottom: 20,
        left: 22,
        right: 10,
    };
    height = 400;
    width = 280;
    x = 4000;
    y = 56;
    killed = false;
    speed = 5;
    nearCharacter = false;
    notCloseEnoughToAttackCharacter = false;
    characterInAttackRange = false;
    characterIsBehindEndboss = false;

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

    /**
     * Constructor for Endboss class.
     * Sets initial properties and loads all relevant images for endboss animations.
     * Sets the initial position, size, and offset of the endboss.
     * Sets the initial state of flags that determine the endboss's behavior.
     * Starts the animation of the endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
    }

    /**
     * Animates the Endboss by playing the alert, hurt, dying, walking, and attacking animations in an infinite loop.
     * The animations are played in the order of alert, hurt, dying, walking, and attacking.
     * The animations are played in an infinite loop until the Endboss is killed.
     */
    animate() {
        this.playBossAlertAnimation();
        this.playBossHurtAnimation();
        this.playBossDyingAnimation();
        this.playBossWalkingAnimation();
        this.playBossAttackingAnimation();
    }

    /**
     * Plays the alert animation for the Endboss if the character is near.
     * The animation is played in an infinite loop until the Endboss is killed.
     * The animation is stored in the intervalIds array to be cleared later.
     */
    playBossAlertAnimation() {
        let endbossAlertInterval = setInterval(() => {
            if (this.nearCharacter) {
                this.playAnimationInfinite(this.IMAGES_ALERT);
            }
        }, 200);
        intervalIds.push(endbossAlertInterval);
    }

    /**
     * Plays the hurt animation for the Endboss if it is hurt.
     * The animation is played in an infinite loop until the Endboss is killed.
     * The animation is stored in the intervalIds array to be cleared later.
     */
    playBossHurtAnimation() {
        let bossHurtInterval = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimationInfinite(this.IMAGES_HURT);
                this.resetIdleTimer();
            }
        }, 100);
        intervalIds.push(bossHurtInterval);
    }

    /**
     * Plays the sound effect for the Endboss dying after a delay of 600 milliseconds.
     * The sound effect is the senioraGallinaDyingSound.
     */
    playEndbossDyingSound() {
        setTimeout(() => {
            senioraGallinaDyingSound.play();
        }, 600);
    }

    /**
     * Ends the Endboss's dying animation by setting the killed state to true, setting the Endboss's image to the last
     * frame of the dying animation, clearing all intervals related to the Endboss's animation, and pausing the game
     * music. This method is called after a delay of 800 milliseconds after the Endboss's dying animation has been
     * started.
     */
    endEndBossDyingAnimationWithCorrectImage() {
        setTimeout(() => {
            this.killed = true;
            this.img.src = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
            this.endAllIntervals();
            runningSound.pause();
            characterJumpSound.pause();
            gameMusic.pause();
        }, 800);
    }

    /**
     * Plays the victory sound after a delay of 1600 milliseconds.
     * The sound that is played is the mexicanHatSound.
     */
    playVictorySound() {
        setTimeout(() => {
            mexicanHatSound.play();
        }, 1600);
    }

    /**
     * Shows the end screen after the Endboss has been killed after a delay of 8000 milliseconds.
     * The end screen is shown by hiding the canvas element and showing the end-screen-wrapper element.
     * The game over sound is played when showing the end screen.
     */
    showEndscreenAfterVictory() {
        setTimeout(() => {
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("end-screen-wrapper").classList.remove("d-none");
            gameOverSound.play();
        }, 8000);
    }

    /**
     * Plays the Endboss's dying animation if the Endboss is dead and not already killed.
     * The dying animation is played by playing the Endboss's dying sound, playing the dying animation once,
     * resetting the idle timer, ending the Endboss's dying animation with the correct image, playing the victory sound,
     * and showing the end screen after a delay of 8000 milliseconds.
     * The animation is stored in the intervalIds array to be cleared later.
     */
    playBossDyingAnimation() {
        let BossDyingInterval = setInterval(() => {
            if (this.isDead() && !this.killed) {
                this.playEndbossDyingSound();
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.resetIdleTimer();
                this.endEndBossDyingAnimationWithCorrectImage();
                this.playVictorySound();
                this.showEndscreenAfterVictory();
            }
        }, 50);
        intervalIds.push(BossDyingInterval);
    }

    /**
     * Plays the walking animation for the Endboss if it is not close enough to attack the character.
     * The animation is played in an infinite loop until the Endboss is close enough to attack the character.
     * The animation is stored in the intervalIds array to be cleared later.
     * If the character is not behind the Endboss, the Endboss moves left and plays the walking animation.
     * If the character is behind the Endboss, the Endboss moves right and plays the walking animation.
     */
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
    }

    /**
     * Plays the attacking animation for the Endboss if the character is in the Endboss's attack range.
     * The animation is played in an infinite loop until the character is no longer in the Endboss's attack range.
     * The animation is stored in the intervalIds array to be cleared later.
     */
    playBossAttackingAnimation() {
        let bossAttackingInterval = setInterval(() => {
            if (this.characterInAttackRange) {
                this.playAnimationOnce(this.IMAGES_ATTACKING);
            }
        }, 100);
        intervalIds.push(bossAttackingInterval);
    }
}
