let frog = document.querySelector('.frog');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let score = 0;

// atribui a função 'jump' ao press da tecla 'espaço' (keycode da barra de espaço: 32)
function handleKeyDown(event) {
    if (event.keyCode === 32) {
        // permite o pulo apenas quando 'isJumping' é 'false' (impede 'double jump')
        if (!isJumping) {
            jump();
        }
    }
}

// função responsável pela animação do pulo
function jump() {

    isJumping = true;

    let upInterval = setInterval(() => {
        // limita a altura do pulo
        if (position >= 150) {
            clearInterval(upInterval);
            // desce
            let downInterval = setInterval(() => {
                // limita a queda
                if (position <=0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    frog.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            // sobe
            frog.style.bottom = position + 'px';
        }
    }, 20);
}

// função responsável pelo surgimento e animação das cobras
// verifica também se há colisão de 'frog' com 'snake'
function createSnake() {
    const snake = document.createElement('div');
    let snakePosition = 1000;
    // gera um valor aleatório entre 0 e 1 que é então multiplicado por 6000
    let randomTime = Math.random() * 6000;

    snake.classList.add('snake');
    snake.style.left = 1000 + 'px';
    background.appendChild(snake);

    // deleta as cobras que saem da tela
    let leftInterval = setInterval(() => {
        if (snakePosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(snake);
            score += 5;
            document.getElementById("score").innerHTML = "Pontos: " + score;
        }
        // verifica se há colisão entre 'frog' e 'snake'
        // se há colisão o jogo é encerrado retornando "Fim de jogo"
        else if (snakePosition > 0 && snakePosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class= "game-over"> Fim de jogo </h1> <p class= "suaScore" >Sua pontuação : '+score+'</p> <a href="javascript:window.location.reload(true)"> <p>Jogar novamente</p> </a>';
        } else {
            snakePosition -= 10;
            snake.style.left = snakePosition + 'px';
        }
    }, 20);

    setTimeout(createSnake, randomTime);
}

// chamada de função
createSnake();
document.addEventListener ('keydown', handleKeyDown);