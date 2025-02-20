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
bottles = [];
backgroundObjects = [];

let level1 = new Level(enemies, clouds, backgroundObjects, coins, bottles);

addBackgroundObjectsToArray(4, backgroundObjects, -719);
addBottlesToArray(bottles, 10);

function addBottlesToArray(array, bottleCounter) {
    for (let i = 0; i < bottleCounter; i++) {
        array.push(new ThrowableObject(Math.floor(Math.random() * 2000) + 200, 365));
    }
}

function addBackgroundObjectsToArray(screenCounter, array, worldSize) {
    for (let i = 0; i < screenCounter; i++) {
        array.push(new BackgroundObject("../assets/img/5_background/layers/air.png", worldSize));
        array.push(new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", worldSize));
        array.push(new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", worldSize));
        array.push(new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", worldSize));
        array.push(new BackgroundObject("../assets/img/5_background/layers/air.png", worldSize + 719));
        array.push(new BackgroundObject("../assets/img/5_background/layers/3_third_layer/2.png", worldSize + 719));
        array.push(new BackgroundObject("../assets/img/5_background/layers/2_second_layer/2.png", worldSize + 719));
        array.push(new BackgroundObject("../assets/img/5_background/layers/1_first_layer/2.png", worldSize + 719));
        worldSize = worldSize + 1438;
    }
}
