const gameContainer = document.getElementById("game");
let score = 0;
let highScore = 0;
let correctCount = 0;

let similarSaturation = 80;
let similarLightness = 30;
let differentSaturation = 55;
let differentLightness = 25;

generateSquares();

function generateSquares() {
    gameContainer.innerHTML = "";
  
    const similarHue = Math.floor(Math.random() * 360);
  
    const squares = [];
    for (let i = 0; i < 80; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        square.style.backgroundColor = `hsl(${similarHue}, ${similarSaturation}%, ${similarLightness}%)`;

        square.addEventListener("click", handleWrong);
        square.addEventListener("click", () => {
            differentSquare.style.outline = '5px solid hsl(0, 0%, 85%)';
        });
        squares.push(square);
    }
  
    const differentSquare = document.createElement("div");
    differentSquare.classList.add("square");

    differentSquare.style.backgroundColor = `hsl(${similarHue}, ${differentSaturation}%, ${differentLightness}%)`;

    differentSquare.addEventListener("click", handleCorrect);
    squares.push(differentSquare);

    shuffleArray(squares);
  
    squares.forEach((square) => {
        gameContainer.appendChild(square);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function tryAgain() {
    const tryAgainButton = document.getElementById("try-again");
    tryAgainButton.style.display = "block";
    tryAgainButton.innerHTML = `Tentar Novamente`;
    tryAgainButton.addEventListener("click", () => {
        generateSquares();
        score = 0;
        const scoreDisplay = document.getElementById("score");
        scoreDisplay.innerHTML = `Sua Pontuação: <b>${score}</b>`;
        game.style.pointerEvents = "auto";
        tryAgainButton.innerHTML = ``;
        tryAgainButton.style.display = "none";
    })
}

function handleCorrect() {
    score++;
    correctCount++;
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.innerHTML = `Sua Pontuação: <b>${score}</b>`;

    if (correctCount > 4) {
        adjustDifficulty();
        correctCount = 0;
    }

    generateSquares();
}

function adjustDifficulty() {
    similarLightness = Math.min(similarLightness + 1, 50); // Vai de 45 até no máximo 50
    differentLightness = Math.min(differentLightness + 1, 51); //Vai de 35 até no máximo 45

    similarSaturation = Math.max(similarSaturation - 1, 70); //Vai de 80 até no mínimo 70
    differentSaturation = Math.min(differentSaturation + 1, 69); //Vai de 70 até no mínimo 65
}


function handleWrong() {
    const game = document.getElementById("game");
    game.style.pointerEvents = "none";
    const scoreDisplay = document.getElementById("score");
    let message = `Não consegue né Moisés? Fim de Jogo :(<br>Last Score: <b>${score}</b>`;
    similarSaturation = 80;
    similarLightness = 30;
    differentSaturation = 55;
    differentLightness = 25;
  
    if (score > highScore) {
        highScore = score;
        message = `Parabéns! Nova Maior Pontuação: <b>${highScore}</b>`;
    } else {
        message += `<br>Maior Pontuação: <b>${highScore}</b>`;
    }
    
    if (score > 4) {
        message += `<br><br>Prestar atenção na aula não quer né?!`;
    }
    
    scoreDisplay.innerHTML = message;
    tryAgain();
}