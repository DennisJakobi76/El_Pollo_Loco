class CollectableObject extends MovableObject {
    offset = {
        top: 55,
        bottom: 55,
        left: 55,
        right: 55,
    };
    width = 160;
    height = 160;

    IMAGES = ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"];

    /**
     * Constructs a new instance of CollectableObject.
     * Loads the initial image and all images for animation.
     * Positions the object at a random x-coordinate, with a
     * maximum limit of 3200, and a random y-coordinate between 100 and 230.
     * Increments the global coinCounter and starts the animation.
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 420 + Math.random() * 800 * coinCounter;
        if (this.x > 3500) {
            this.x = 3200;
        }
        this.y = 100 + Math.random() * 130;
        coinCounter++;
        this.animate();
    }

    /**
     * Animates the coin by blinking it on and off.
     * The coin blinks by switching between its two images in the IMAGES array.
     * The blinking occurs every 750 milliseconds.
     * The animation is stored in the intervalIds array to be cleared later.
     */
    animate() {
        let coinBlinkInterval = setInterval(() => {
            if (!(this instanceof ThrowableObject)) {
                this.playAnimationInfinite(this.IMAGES);
            }
        }, 750);
        intervalIds.push(coinBlinkInterval);
    }
}
