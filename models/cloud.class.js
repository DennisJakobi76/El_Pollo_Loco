class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    IMAGES = ["../assets/img/5_background/layers/4_clouds/1.png", "../assets/img/5_background/layers/4_clouds/2.png"];

    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        if (cloudCounter == 1) {
            this.x = 200;
        } else {
            this.x += 300 * cloudCounter + 2;
        }

        const randomIndex = Math.floor(Math.random() * this.IMAGES.length);
        this.img.src = this.IMAGES[randomIndex];
        cloudCounter++;
        this.animate();
    }
    animate() {
        let cloudMoveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        intervalIds.push(cloudMoveLeftInterval);
    }
}
