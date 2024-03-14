const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const start = document.querySelector(".start");
const gameOver = document.querySelector(".gameOver");

const themeAudio = new Audio("../audio/audio_theme.ogg");
const gameOverAudio = new Audio("../audio/audio_gameover.ogg");

const gameStatus = {
    isPlaying: false,
    isJumping: false,
};

const startGame = () => {
    resetGame();

    pipe.classList.add("animatedPipe");
    start.style.display = "none";

    themeAudio.play();
    gameStatus.isPlaying = true;

    requestAnimationFrame(gameLoop);
};

const resetGame = () => {
    gameOver.style.display = "none";

    pipe.style.left = "";
    pipe.style.rigth = "0";

    mario.src = "../assets/mario.gif";
    mario.style.width = "150px";
    mario.style.bottom = "0";
    mario.style.position = "absolute";

    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;

    themeAudio.currentTime = 0;
    themeAudio.play();
};

const jump = () => {
    if (gameStatus.isPlaying && !gameStatus.isJumping) {
        mario.classList.add("jumping");
        gameStatus.isJumping = true;

        setTimeout(() => {
            mario.classList.remove("jumping");
        }, 800);
        setTimeout(() => {
            gameStatus.isJumping = false;
        }, 850);
    }
};

const endGame = () => {
    pipe.classList.remove("animatedPipe");
    mario.classList.remove("jumping");

    mario.src = "../assets/game-over.png";
    mario.style.width = "8opx";
    mario.style.marginLeft = "50px";

    themeAudio.pause();

    gameOverAudio.play();
    function stopAudio() {
        gameOverAudio.pause();
        gameOverAudio.currentTime = 0;
    }
    setTimeout(stopAudio, 8000);

    gameOver.style.display = "flex";
    gameStatus.isPlaying = false;
};

const gameLoop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window
        .getComputedStyle(mario)
        .bottom.replace("px", " ");

    if (pipePosition <= 120 && pipePosition >= 0 && marioPosition < 80) {
        endGame();

        pipe.style.left = `${pipePosition}px`;
        mario.style.bottom = `${marioPosition} px`;
    }

    if (gameStatus.isPlaying) {
        requestAnimationFrame(gameLoop);
    }
};

document.addEventListener("keypress", (e) => {
    const key = e.key;
    if (key === " ") {
        jump();
    }
    if (key === "Enter" && !gameStatus.isPlaying) {
        startGame();
    }
});
