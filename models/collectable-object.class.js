class CollectableObject extends MovableObject {
    IMAGES = ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"];

    /**
     * Creates a new Coin instance at a random x position on the screen.
     * The x position is determined by the coinCounter variable which is
     * incremented each time a new Coin instance is created.
     * The y position is set to a random value between 100 and 230.
     * The coin starts animating immediately.
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.offset = {
            top: 55,
            bottom: 55,
            left: 55,
            right: 55,
        };
        this.width = 160;
        this.height = 160;
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
