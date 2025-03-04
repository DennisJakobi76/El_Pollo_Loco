class ThrowableObject extends CollectableObject {
    offset = {
        top: 10,
        bottom: 8,
        left: 18,
        right: 10,
    };
    height = 60;
    width = 50;
    world = world;
    lyingOnTheGround = false;
    flightDirection = null;

    IMAGES_ROTATION = [
        "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_ON_GROUND = ["./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

    IMAGES_BOTTLE_SPLASH = [
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    /**
     * Initializes a new instance of the ThrowableObject class.
     * Loads images for the object's various states and sets initial properties.
     *
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }

    /**
     * Throws the bottle in the direction the character is facing.
     * If the bottle is in the world, it will be thrown in the direction the character is facing.
     * If the bottle is not in the world, the function will return without doing anything.
     * The bottle will be thrown with an initial falling speed of 15 pixels per frame.
     * The bottle will then be subject to gravity.
     * The bottle will be animated while it is in the air and when it hits the ground.
     */
    throw() {
        if (this.world) {
            this.flightDirection = this.world.character.otherDirection ? -1 : 1;
            this.fallSpeed = 15;
            this.applyGravity();
            this.intervalId = setInterval(() => {
                if (this.isAboveGround()) {
                    this.playFlyingBottleAnimation();
                } else {
                    this.playBottleOnGroundAnimation();
                    this.lyingOnTheGround = true;
                }
            }, 30);
        } else {
            return;
        }
    }

    /**
     * Plays the flying bottle animation by setting the bottle's image to the first frame of the
     * rotation animation and increasing the bottle's x position by 10 pixels multiplied by the
     * flight direction.
     */
    playFlyingBottleAnimation() {
        this.playAnimationInfinite(this.IMAGES_ROTATION);
        this.x += this.flightDirection * 10;
    }

    /**
     * Plays the bottle on ground animation by setting the bottle's image to a random frame of the
     * bottle on ground animation and stopping the animation after 60 milliseconds.
     * The bottle's x position is not changed during the animation.
     * The characterHasThrownOneBottle flag is reset when the animation is finished.
     */
    playBottleOnGroundAnimation() {
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE_ON_GROUND.length);
        this.playAnimationOnce([this.IMAGES_BOTTLE_ON_GROUND[randomIndex]]);
        this.x += 0;
        setTimeout(() => {
            clearInterval(this.intervalId);
        }, 60);
        characterHasThrownOneBottle = false;
    }

    /**
     * Plays the bottle splash animation by setting the bottle's image to the bottle splash image
     * every 50 milliseconds and resetting the characterHasThrownOneBottle flag to false.
     */
    playBottleSplashAnimation() {
        setInterval(() => {
            this.playAnimationOnce(this.IMAGES_BOTTLE_SPLASH);
        }, 50);
        characterHasThrownOneBottle = false;
    }
}
