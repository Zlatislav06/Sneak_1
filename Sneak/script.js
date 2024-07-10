const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
let count = 0;
let score = 0;
let snake = [
    { x: grid * 5, y: grid * 5 },
];
let direction = { x: 0, y: 0 };
let food = getRandomFoodPosition();

const backgroundImage = new Image();
backgroundImage.src = 'D:/HTML/Sneak/images.png'; // Заместете с пътя към вашето изображение

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -grid };
    } else if (e.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: grid };
    } else if (e.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -grid, y: 0 };
    } else if (e.key === "ArrowRight" && direction.x === 0) {
        direction = { x: grid, y: 0 };
    }
});

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
        y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
    };
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (++count < 4) {
        return;
    }
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    snake.unshift({
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    });

    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = getRandomFoodPosition();
        score++;
        document.getElementById('score').innerText = score;
    } else {
        snake.pop();
    }

    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        resetGame();
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, grid - 1, grid - 1));
}

function resetGame() {
    snake = [
        { x: grid * 5, y: grid * 5 },
    ];
    direction = { x: 0, y: 0 };
    food = getRandomFoodPosition();
    score = 0;
    document.getElementById('score').innerText = score;
}

// Play game music
const gameMusic = document.getElementById('gameMusic');
gameMusic.play();

backgroundImage.onload = function() {
    requestAnimationFrame(gameLoop);
};
 // Automatically play the music when the page loads
        window.onload = function() {
            var music = document.getElementById("gameMusic");
            music.play();
        };

        // Loop the music
        var music = document.getElementById("gameMusic");
        music.loop = true;


