let intervalIds = [];

let cloudCounter = 1;
let chickenCounter = 1;
let coinCounter = 1;
let charactersInitialFallSpeed = 20;
let characterHasThrownOneBottle = false;
let eplSoundChoice = false;
let isFirstGameStart = true;

let startScreenSound = new Audio("./assets/audio/startScreenSound.mp3");
let deadScreenSound = new Audio("./assets/audio/deadScreenSound.mp3");
let gameOverSound = new Audio("./assets/audio/gameOverSound.mp3");
let gameMusic = new Audio("./assets/audio/gameSound.mp3");
let characterJumpSound = new Audio("./assets/audio/characterJump.mp3");
let chickenHitSound = new Audio("./assets/audio/chickenHitSound.mp3");
let bottleSplashSound = new Audio("./assets/audio/bottleBreakSound.mp3");
let runningSound = new Audio("./assets/audio/runningSound.mp3");
let snoringSound = new Audio("./assets/audio/snoringSound.mp3");
let characterHitSound = new Audio("./assets/audio/characterHitSound.mp3");
let characterDyingSound = new Audio("./assets/audio/dyingCharacterSound.mp3");
let characterDeadSound = new Audio("./assets/audio/characterDeadSound.mp3");
let senioraGallinaHitSound = new Audio("./assets/audio/senioraGallinaHitSound.mp3");
let senioraGallinaDyingSound = new Audio("./assets/audio/senioraGallinaDyingSound.mp3");
let mexicanHatSound = new Audio("./assets/audio/mexicanHatSound.mp3");
let pickUpItemSound = new Audio("./assets/audio/pickUpItemSound.mp3");
let throwBottleSound = new Audio("./assets/audio/throwBottleSound.mp3");
let allAudios = [
    startScreenSound,
    deadScreenSound,
    gameOverSound,
    gameMusic,
    characterJumpSound,
    chickenHitSound,
    bottleSplashSound,
    runningSound,
    snoringSound,
    characterHitSound,
    characterDyingSound,
    characterDeadSound,
    senioraGallinaHitSound,
    senioraGallinaDyingSound,
    mexicanHatSound,
    pickUpItemSound,
    throwBottleSound,
];

/**
 * Sets the volume levels for various game audio elements.
 * Each audio element is assigned a specific volume level ranging from 0.0 to 1.0.
 * This function is used to initialize or reset the audio volumes to their default levels.
 */

function setSoundVolumes() {
    startScreenSound.volume = 0.1;
    deadScreenSound.volume = 0.1;
    gameOverSound.volume = 0.1;
    gameMusic.volume = 0.1;
    characterDyingSound.volume = 0.1;
    characterDeadSound.volume = 0.1;
    characterHitSound.volume = 0.1;
    snoringSound.volume = 0.1;
    pickUpItemSound.volume = 0.1;
    runningSound.volume = 0.1;
    throwBottleSound.volume = 0.1;
    chickenHitSound.volume = 0.1;
    characterJumpSound.volume = 0.1;
    bottleSplashSound.volume = 0.1;
    senioraGallinaHitSound.volume = 0.1;
    senioraGallinaDyingSound.volume = 0.1;
    mexicanHatSound.volume = 0.1;
}
/**
 * Stops all currently playing audio elements and resets their currentTime to 0.
 * This is useful for silencing all audio in the game when transitioning to a new screen or restarting the game.
 */
function stopAllAudios() {
    allAudios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
}
/**
 * Mutes all audio elements in the game by setting their volume levels to 0.
 * This is useful for silencing all audio in the game when the user wants to play the game in silent mode.
 */
function muteAllSounds() {
    allAudios.forEach((audio) => (audio.volume = 0));
}

/**
 * Sets an audio element to loop indefinitely by listening to the 'ended' event
 * and resetting the currentTime to 0 and playing the audio again.
 * @param {HTMLAudioElement} audio - The audio element to loop.
 */
function setAudioLoop(audio) {
    audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        audio.play();
    });
}

/**
 * Writes the current sound choice to the local storage.
 * The key used to store the sound choice is "EPL_SoundOn" and the value is the current value of the global variable eplSoundChoice.
 */
function writeSoundChoiceToLocalStorage() {
    localStorage.setItem("EPL_SoundOn", eplSoundChoice);
}

/**
 * Reads the sound choice from the local storage and returns it.
 * The sound choice is a string indicating whether the sound is on or off.
 * The key used to store the sound choice is "EPL_SoundOn".
 * If the key is not found in the local storage, the function returns null.
 * @return {string|null} The current sound choice or null if not found.
 */
function readSoundChoiceFromLocalStorage() {
    eplSoundChoice = localStorage.getItem("EPL_SoundOn");
    if (eplSoundChoice === null) {
        eplSoundChoice = "false";
    }
    return eplSoundChoice;
}

setAudioLoop(startScreenSound);
setAudioLoop(gameMusic);
setAudioLoop(deadScreenSound);
setAudioLoop(gameOverSound);
setSoundVolumes();
