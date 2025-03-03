const MUTE_ICON = document.getElementById("mute-icon");
const SPEAKER_ICON = document.getElementById("speaker-icon");
const SCREEN_ICON = document.getElementById("toggle-screen-icon");
const START_SCREEN_WRAPPER = document.getElementById("start-screen-wrapper");
const END_SCREEN_WRAPPER = document.getElementById("end-screen-wrapper");
const CANVAS = document.getElementById("canvas");
const GAME_OVER_MESSAGE_IMG = document.getElementById("game-over-img");

let isStartScreen = true;

/**
 * Makes music audible again after it was muted.
 *
 * @author Manuel Paccagnella
 */
function unmuteMusic() {
    MUTE_ICON.classList.add("d-none");
    if (isStartScreen || (eplSoundChoice && !isFirstGameStart && isStartScreen)) {
        startScreenSound.currentTime = 0;
        startScreenSound.play();
    }
    setSoundVolumes();
    eplSoundChoice = true;
    writeSoundChoiceToLocalStorage();
}

/**
 * Mutes the music in the game by hiding the mute icon and muting all sounds.
 * It also updates the sound choice state and saves it to local storage.
 * This function is typically used when the user opts to mute the game audio.
 */

function muteMusic() {
    MUTE_ICON.classList.remove("d-none");
    muteAllSounds();
    eplSoundChoice = false;
    writeSoundChoiceToLocalStorage();
}

/**
 * Initiates the game by transitioning from the start screen to the game canvas.
 * Pauses the start screen music, reveals the game canvas, and hides the start screen wrapper.
 * Reads the sound choice from local storage to determine whether to mute or unmute music.
 * Sets up the game world and updates the state to indicate it's no longer the first game start.
 */

function startGame() {
    isStartScreen = false;
    startScreenSound.pause();
    CANVAS.classList.remove("d-none");
    START_SCREEN_WRAPPER.classList.add("d-none");
    eplSoundChoice = readSoundChoiceFromLocalStorage();
    if (eplSoundChoice === "false") {
        muteAllSounds();
    } else {
        unmuteMusic();
    }
    createWorld();
    isFirstGameStart = false;
}

/**
 * Restarts the game by stopping all audio, hiding the end screen, and initiating the game again.
 * It also resets the game over image and updates the sound choice state accordingly.
 * This function is called when the user chooses to replay the game after viewing the end screen.
 */
function restartGame() {
    GAME_OVER_MESSAGE_IMG.src = "./assets/img/9_intro_outro_screens/game_over/game over.png";
    stopAllAudios();
    eplSoundChoice = readSoundChoiceFromLocalStorage();
    if (eplSoundChoice === "false") {
        muteAllSounds();
    } else {
        unmuteMusic();
    }
    END_SCREEN_WRAPPER.classList.add("d-none");
    startGame();
}

/**
 * Shows the home screen by stopping all audio, setting the game over image to the default image,
 * updating the sound choice state, and hiding the game canvas and end screen wrapper, while revealing the start screen wrapper.
 * This function is called when the user chooses to leave the game after viewing the end screen.
 */

function showHomeScreen() {
    GAME_OVER_MESSAGE_IMG.src = "./assets/img/9_intro_outro_screens/game_over/game over.png";
    isStartScreen = true;
    stopAllAudios();
    eplSoundChoice = readSoundChoiceFromLocalStorage();
    if ((!isFirstGameStart && eplSoundChoice === "false") || eplSoundChoice === "false") {
        muteMusic();
    } else {
        unmuteMusic();
    }
    CANVAS.classList.add("d-none");
    END_SCREEN_WRAPPER.classList.add("d-none");
    START_SCREEN_WRAPPER.classList.remove("d-none");
}

document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        SCREEN_ICON.src = "./assets/icons/window_mode_icon.png";
    } else {
        SCREEN_ICON.src = "./assets/icons/fullscreen_icon.png";
    }
});
