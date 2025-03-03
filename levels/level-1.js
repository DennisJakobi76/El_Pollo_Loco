/**
 * Initializes the game level by resetting counters and creating arrays
 * for enemies, clouds, coins, and background objects. It populates these
 * arrays with instances of game objects such as Chicken, SmallChicken,
 * Endboss, Cloud, and CollectableObject. It also adds background objects
 * to the array and creates a new Level instance with these objects.
 *
 * @returns {Level} - The initialized level with populated game objects.
 */

function initLevel() {
    level1 = null;
    cloudCounter = 1;
    chickenCounter = 1;
    coinCounter = 1;
    enemies = [];
    clouds = [];
    coins = [];
    backgroundObjects = [];

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss(),
    ];
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];

    coins = [new CollectableObject(), new CollectableObject(), new CollectableObject(), new CollectableObject(), new CollectableObject()];

    addBackgroundObjectsToArray(4, backgroundObjects, -719);
    level1 = new Level(enemies, clouds, backgroundObjects, coins);

    return level1;
}

/**
 * Adds the necessary background objects to the given array for the given number of screens.
 * Each screen is composed of 8 background objects, which are added to the array in the correct order.
 * The world size is increased by the width of the background objects for each screen.
 * @param {number} screenCounter - The number of screens to add background objects for.
 * @param {array} array - The array to add the background objects to.
 * @param {number} worldSize - The current world size. This is increased by the width of the background objects for each screen.
 */
function addBackgroundObjectsToArray(screenCounter, array, worldSize) {
    for (let i = 0; i < screenCounter; i++) {
        array.push(new BackgroundObject("./assets/img/5_background/layers/air.png", worldSize));
        array.push(new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", worldSize));
        array.push(new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", worldSize));
        array.push(new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", worldSize));
        array.push(new BackgroundObject("./assets/img/5_background/layers/air.png", worldSize + 719));
        array.push(new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", worldSize + 719));
        array.push(new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", worldSize + 719));
        array.push(new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", worldSize + 719));
        worldSize = worldSize + 1438;
    }
}
