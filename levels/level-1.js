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

function addBackgroundObjectsToArray(screenCounter, array, worldSize) {
    for (let i = 0; i < screenCounter; i++) {
        array.push(new BackgroundObject("assets/img/5_background/layers/air.png", worldSize));
        array.push(new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", worldSize));
        array.push(new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", worldSize));
        array.push(new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", worldSize));
        array.push(new BackgroundObject("assets/img/5_background/layers/air.png", worldSize + 719));
        array.push(new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", worldSize + 719));
        array.push(new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", worldSize + 719));
        array.push(new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", worldSize + 719));
        worldSize = worldSize + 1438;
    }
}
