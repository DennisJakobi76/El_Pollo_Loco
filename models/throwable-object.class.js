class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage("../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.fallSpeed = 15;
        this.applyGravity();
        setInterval(() => {
            if (this.y <= 365) {
                this.x += 10;
            } else {
                this.x += 0;
            }
        }, 30);
    }
}
