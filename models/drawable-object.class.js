class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    world;

    /**
     * Initializes a new instance of the DrawableObject class.
     * @constructor
     */
    constructor() {}

    /**
     * Loads an image from the specified path and assigns it to the `img` property.
     *
     * @param {string} path - The path to the image file.
     */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths and caches them.
     *
     * @param {string[]} array - An array of paths to the image files.
     */

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of the DrawableObject on the provided canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the image will be drawn.
     * Logs a warning and an error message if the image cannot be loaded.
     */

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn("Error loading image", e);
            console.log("Could not load image", this.img.src);
        }
    }

    /**
     * Draws a blue frame around the DrawableObject on the provided canvas context if it is an instance of Character, Chicken, SmallChicken, Endboss, ThrowableObject, or CollectableObject.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the frame will be drawn.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof CollectableObject) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a red frame around the DrawableObject with an offset, on the provided canvas context,
     * if it is an instance of Character, Chicken, SmallChicken, Endboss, ThrowableObject, or CollectableObject.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the frame will be drawn.
     */

    drawOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof CollectableObject) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }
}
