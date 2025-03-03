const CONTROL_LEFT = document.getElementById("character-control-left");
const CONTROL_RIGHT = document.getElementById("character-control-right");
const CONTROL_JUMP = document.getElementById("character-control-jump");
const CONTROL_THROW = document.getElementById("character-control-throw");

let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by getting the canvas element.
 */
function init() {
    canvas = document.getElementById("canvas");
}

/**
 * Creates a new World object and assigns it to the `world` variable.
 * This will reset the game state and restart the game.
 * @function
 */
function createWorld() {
    world = null;
    world = new World(canvas, keyboard);
}

CONTROL_LEFT.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
});
CONTROL_LEFT.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
});

CONTROL_RIGHT.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
});
CONTROL_RIGHT.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
});

CONTROL_JUMP.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.UP = true;
});
CONTROL_JUMP.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.UP = false;
});

CONTROL_THROW.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.D = true;
});
CONTROL_THROW.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.D = false;
});

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});
