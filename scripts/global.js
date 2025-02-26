let intervalIds = [];

let cloudCounter = 1;
let chickenCounter = 1;
let coinCounter = 1;
let charactersInitialFallSpeed = 20;

let startScreenSound = new Audio("assets/audio/startScreenSound.mp3");
let deadScreenSound = new Audio("assets/audio/deadScreenSound.mp3");
let gameOverSound = new Audio("assets/audio/gameOverSound.mp3");
let gameMusic = new Audio("assets/audio/gameSound.mp3");
let characterJumpSound = new Audio("assets/audio/characterJump.mp3");
let chickenHitSound = new Audio("assets/audio/chickenHitSound.mp3");
let bottleSplashSound = new Audio("assets/audio/bottleBreakSound.mp3");
let runningSound = new Audio("assets/audio/runningSound.mp3");
let snoringSound = new Audio("assets/audio/snoringSound.mp3");
let characterHitSound = new Audio("assets/audio/characterHitSound.mp3");
let characterDyingSound = new Audio("assets/audio/dyingCharacterSound.mp3");
let characterDeadSound = new Audio("assets/audio/characterDeadSound.mp3");
let senioraGallinaHitSound = new Audio("assets/audio/senioraGallinaHitSound.mp3");
let senioraGallinaDyingSound = new Audio("assets/audio/senioraGallinaDyingSound.mp3");
let mexicanHatSound = new Audio("assets/audio/mexicanHatSound.mp3");
let pickUpItemSound = new Audio("assets/audio/pickUpItemSound.mp3");
let throwBottleSound = new Audio("assets/audio/throwBottleSound.mp3");
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

startScreenSound.volume = 0.6;
deadScreenSound.volume = 0.6;
gameOverSound.volume = 0.6;
characterDyingSound.volume = 0.4;
characterDeadSound.volume = 0.4;
gameMusic.volume = 0.3;
snoringSound.volume = 0.2;
pickUpItemSound.volume = 0.2;
runningSound.volume = 0.2;
throwBottleSound.volume = 0.2;
chickenHitSound.volume = 0.4;
characterJumpSound.volume = 0.2;
bottleSplashSound.volume = 0.2;

function stopAllAudios() {
    allAudios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
}
