const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600; // Width of the game area
canvas.height = 200; // Height of the game area

let spaceship = { x: 50, y: canvas.height - 50, width: 50, height: 50 };
let planets = [];
let asteroids = [];
let score = 0;
let highScore = 0;
let isGameOver = false;
let jump = false;
let gravity = 1;
let velocityY = 0;

// Function to draw the spaceship
function drawSpaceship() {
    const img = new Image();
    img.src = 'spaceship.png'; // Ensure the image path is correct
    ctx.drawImage(img, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

// Function to draw planets and asteroids
function drawObstacles() {
    planets.forEach(planet => {
        ctx.fillStyle = 'green';
        ctx.fillRect(planet.x, canvas.height - 40, 20, 20); // Draw planets
    });

    asteroids.forEach(asteroid => {
        ctx.fillStyle = 'gray';
        ctx.fillRect(asteroid.x, asteroid.y, 20, 20); // Draw asteroids
    });
}

// Function to handle game logic
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawObstacles();

    if (!isGameOver) {
        // Gravity effect
        if (jump) {
            spaceship.y -= 5; // Adjust jump height
            velocityY = -10; // Adjust jump speed
            jump = false;
        } else {
            spaceship.y += gravity; // Apply gravity
        }

        if (spaceship.y > canvas.height - spaceship.height) {
            spaceship.y = canvas.height - spaceship.height; // Reset position if on ground
        }

        score++;
        document.getElementById('score').innerText = `Score: ${score}`;

        if (score > highScore) {
            highScore = score;
        }

        document.getElementById('highScore').innerText = `High Score: ${highScore}`;

        // Move obstacles
        planets.forEach((planet, index) => {
            planet.x -= 3; // Move planets left
            if (planet.x < -20) { // Remove planets that have left the screen
                planets.splice(index, 1);
            }
            // Collision detection
            if (
                spaceship.x < planet.x + 20 &&
                spaceship.x + spaceship.width > planet.x &&
                spaceship.y + spaceship.height > canvas.height - 40
            ) {
                isGameOver = true; // End game on collision
            }
        });

        asteroids.forEach((asteroid, index) => {
            asteroid.x -= 3; // Move asteroids left
            if (asteroid.x < -20) { // Remove asteroids that have left the screen
                asteroids.splice(index, 1);
            }
            // Collision detection
            if (
                spaceship.x < asteroid.x + 20 &&
                spaceship.x + spaceship.width > asteroid.x &&
                spaceship.y < asteroid.y + 20
            ) {
                isGameOver = true; // End game on collision
            }
        });

        if (isGameOver) {
            ctx.fillStyle = 'red';
            ctx.font = '30px Arial';
            ctx.fillText("Game Over!", canvas.width / 2 - 75, canvas.height / 2);
            ctx.fillText("Press R to Restart", canvas.width / 2 - 100, canvas.height / 2 + 30);
            return; // Stop the game loop
        }

        requestAnimationFrame(gameLoop);
    }
}

// Generate obstacles
function generateObstacles() {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
        // 50% chance to generate a planet
        planets.push({ x: canvas.width, y: canvas.height - 40 });
    } else {
        // 50% chance to generate an asteroid
        const asteroidY = Math.random() > 0.5 ? canvas.height - 50 : canvas.height - 100; // Random height
        asteroids.push({ x: canvas.width, y: asteroidY });
    }
}

// Handle key events
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        jump = true;
        jumpSound.play();
    }
    if (e.code === 'ArrowDown') {
        // Logic to avoid asteroid (if needed)
    }
    if (e.code === 'KeyR' && isGameOver) {
        // Restart game
        isGameOver = false;
        score = 0;
        planets = [];
        asteroids = [];
        spaceship.y = canvas.height - 50; // Reset spaceship position
        gameLoop();
    }
});

// Start the game and generate obstacles every second
function startGame() {
    setInterval(generateObstacles, 1500); // Generate an obstacle every 1.5 seconds
    initGame();
}

// Call startGame when the page loads
window.onload = startGame;
