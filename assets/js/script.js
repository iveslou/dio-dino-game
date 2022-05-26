const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

// atribui a função 'jump' ao release da tecla 'espaço' (keycode da barra de espaço: 32)
function handleKeyUp(event) {
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
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            // sobe
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// função responsável pelo surgimento e animação dos cactus
// verifica também se há colisão de 'dino' com 'cacti'
function createCacti() {
    const cacti = document.createElement('div');
    let cactiPosition = 1000;
    // gera um valor aleatório entre 0 e 1 que é então multiplicado por 6000
    let randomTime = Math.random() * 6000;

    cacti.classList.add('cacti');
    cacti.style.left = 1000 + 'px';
    background.appendChild(cacti);

    // deleta os cactos que saem da tela
    let leftInterval = setInterval(() => {
        if (cactiPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cacti);
        }
        // verifica se há colisão entre 'dino' e 'cacti'
        // se há colisão o jogo é encerrado retornando "Fim de jogo"
        else if (cactiPosition > 0 && cactiPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class= "game-over"> Fim de jogo </h1>';
        } else {
            cactiPosition -= 10;
            cacti.style.left = cactiPosition + 'px';
        }
    }, 20);

    setTimeout(createCacti, randomTime);
}

// chamada de função
createCacti();
document.addEventListener ('keyup', handleKeyUp);