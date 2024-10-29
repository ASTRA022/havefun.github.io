const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.getElementById('scoreBoard').offsetHeight;

let spaceship = { x: 50, y: canvas.height - 100, width: 50, height: 50 };
let score = 0;
let highScore = 0;
let isGameOver = false;

// Function to draw the spaceship
function drawSpaceship() {
    const img = new Image();
    img.src = 'spaceship.png'; // Add your spaceship image here
    ctx.drawImage(img, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

// Function to handle game logic
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    if (!isGameOver) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        requestAnimationFrame(gameLoop);
    }
}

// Initialize the game
function initGame() {
    score = 0;
    isGameOver = false;
    gameLoop();
}

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        jumpSound.play();
        spaceship.y -= 100; // Adjust jump height
        setTimeout(() => { spaceship.y += 100; }, 300); // Reset position after jump
    }
});
