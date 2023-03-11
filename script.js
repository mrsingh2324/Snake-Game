const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const startButton = document.querySelector(".startbutton");
const resetButton = document.querySelector(".resetbutton");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [1];
let setIntervalId;
let score = 0;
let speed=160;
let isPaused = false;

let highScore = localStorage.getItem("high-score") || 0;

highScoreElement.innerText = `High Score : ${highScore}`;

  
  resetButton.addEventListener('click', () => {
      location.reload();
  })

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

startButton.addEventListener("click", ()=>{
    if(velocityX ===0 &&velocityY===0){
        velocityX =1;
    }
})

const handleGameOver = () => {
    const restart = confirm("Game Over !! Press OK to Start Again");
  
    if (restart) {
      location.reload();
      gameOver=false
    } 
  };

const initGame = () => {
  if (gameOver) return handleGameOver();
  
  htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  
  if (snakeX === foodX && snakeY === foodY ){
    changeFoodPosition();

    snakeBody.push([foodX, foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;

    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `score: ${score}`;
    highScoreElement.innerText = `High Score : ${highScore}`;
  }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
  
  

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if ((snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 )) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (
      i != 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) 
    {
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
};

changeFoodPosition();
setIntervalId = setInterval(initGame, speed);
document.addEventListener("keydown", changeDirection);
