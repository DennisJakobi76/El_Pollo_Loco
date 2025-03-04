class Level {
    level_end_x = 4410;

    /**
     * Initializes a new Level object with the given parameters.
     *
     * @param {Array<MovableObject>} enemies - An array of MovableObject instances representing the enemies in the level.
     * @param {Array<Cloud>} clouds - An array of Cloud instances representing the clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - An array of BackgroundObject instances representing the background objects in the level.
     * @param {Array<CollectableObject>} coins - An array of CollectableObject instances representing the coins in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}
