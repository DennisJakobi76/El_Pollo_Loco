class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        "../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_ON_GROUND = ["../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

    offset = {
        top: 10,
        bottom: 8,
        left: 18,
        right: 10,
    };

    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.loadImages(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.characterLooksRight = true;
        this.world = world;
        this.throw();
    }

    throw() {
        this.fallSpeed = 15;
        this.applyGravity();
        this.intervalId = setInterval(() => {
            if (this.isAboveGround()) {
                this.playFlyingBottleAnimation();
            } else {
                this.playBottleOnGroundAnimation();
            }
        }, 30);
    }

    playFlyingBottleAnimation() {
        this.playAnimationInfinite(this.IMAGES_ROTATION);
        if (this.world.character.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    }

    playBottleOnGroundAnimation() {
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE_ON_GROUND.length);
        this.playAnimationOnce([this.IMAGES_BOTTLE_ON_GROUND[randomIndex]]);
        this.x += 0;
        setTimeout(() => {
            clearInterval(this.intervalId);
        }, 60);
    }
}
