// Função para reproduzir o som de venda
function playSaleSound() {
    setTimeout(function() {
        const audio = new Audio('Som-de-dinheiro-Caixa-registradora.mp3');
        audio.play();
    }, 44); // Intervalo de 1 segundo (1000 milissegundos)
}











const p1Div = document.getElementById('p1');
const p2Div = document.getElementById('p2');
const p3Div = document.getElementById('p3');
const p4Div = document.getElementById('p4');


function mostrarPagina(pagina) {
    p1Div.style.display = pagina === 'p1' ? 'block' : 'none';
    p2Div.style.display = pagina === 'p2' ? 'block' : 'none';
    p3Div.style.display = pagina === 'p3' ? 'block' : 'none';
    p4Div.style.display = pagina === 'p4' ? 'block' : 'none';
}

let valor = 207.00;
const valorSpan = document.getElementById('valor');

function atualizarValor() {
    valorSpan.textContent = `R$ ${valor.toFixed(2)}`
}

atualizarValor();


function aumentarValor() {
    const incremento = [69];
    const indiceAleatorio = Math.floor(Math.random() * incremento.length);
    const valorIncremento = incremento[indiceAleatorio];
    valor += valorIncremento;
    atualizarValor()
}

atualizarValor();






/* DIV 1 */
function showPopupB1() {
    document.getElementById('popupB1').style.display = 'block'
}

function closePopupB1() {
    document.getElementById('popupB1').style.display = 'none'
}

function showLoadingB1() {
    var button = document.getElementById("B1");
    aumentarValor();
    showPopupB1();
    playSaleSound(); // Adicione esta linha para reproduzir o som
    setTimeout(function() {
        closePopupB1();
        mostrarPagina('p2');
    }, 3333);
}
/* DIV 1 */


/* DIV 2 */
function showPopupB2() {
    document.getElementById('popupB2').style.display = 'block'
}

function closePopupB2() {
    document.getElementById('popupB2').style.display = 'none'
}

function showLoadingB2() {
    var button = document.getElementById("B2");
    aumentarValor();
    showPopupB2();
    playSaleSound(); // Adicione esta linha para reproduzir o som
    setTimeout(function() {
        closePopupB2();
        mostrarPagina('p3');
    }, 3333);
}
/* DIV 2 */


/* DIV 3 */
function showPopupB3() {
    document.getElementById('popupB3').style.display = 'block'
}

function closePopupB3() {
    document.getElementById('popupB3').style.display = 'none'
}

function showLoadingB3(utm) {
    var utm = utm;
    var button = document.getElementById("B3");
    aumentarValor();
    showPopupB3();
    playSaleSound(); // Adicione esta linha para reproduzir o som

    setTimeout(function() {
        redirectToVsl(utm);
    }, 3333);
}

function redirectToVsl(utm) {
    window.location.href = "../05/index.html";
}





function generateRandomCode(length) {

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let codigo = "";

    for (let i = 0; i < length; i++) {

    const randomIndex = Math.floor(Math.random() * characters.length);

    codigo += characters.charAt(randomIndex)

    }

    return codigo

}


const codigoAleatorio = generateRandomCode(7);
const codigoAleatorioErrado = generateRandomCode(7);

document.getElementById("codigoAleatorio").textContent = codigoAleatorio;

document.getElementById("codigoAleatorioCerto").textContent = codigoAleatorio;

document.getElementById("codigoAleatorioErrado").textContent = codigoAleatorioErrado;

document.getElementById("codigoGerado").style.display = "block";



const codigoAleatorio2 = generateRandomCode(7);
const codigoAleatorioErrado2 = generateRandomCode(7);

document.getElementById("codigoAleatorio2").textContent = codigoAleatorio2;

document.getElementById("codigoAleatorioCerto2").textContent = codigoAleatorio2;

document.getElementById("codigoAleatorioErrado2").textContent = codigoAleatorioErrado2;

document.getElementById("codigoGerado2").style.display = "block";



const codigoAleatorio3 = generateRandomCode(7);
const codigoAleatorioErrado3 = generateRandomCode(7);

document.getElementById("codigoAleatorio3").textContent = codigoAleatorio3;

document.getElementById("codigoAleatorioCerto3").textContent = codigoAleatorio3;

document.getElementById("codigoAleatorioErrado3").textContent = codigoAleatorioErrado3;

document.getElementById("codigoGerado3").style.display = "block";



const codigoAleatorio4 = generateRandomCode(7);
const codigoAleatorioErrado4 = generateRandomCode(7);

document.getElementById("codigoAleatorio4").textContent = codigoAleatorio4;

document.getElementById("codigoAleatorioCerto4").textContent = codigoAleatorio4;

document.getElementById("codigoAleatorioErrado4").textContent = codigoAleatorioErrado4;

document.getElementById("codigoGerado4").style.display = "block";



const codigoAleatorio5 = generateRandomCode(7);
const codigoAleatorioErrado5= generateRandomCode(7);

document.getElementById("codigoAleatorio5").textContent = codigoAleatorio5;

document.getElementById("codigoAleatorioCerto5").textContent = codigoAleatorio5;

document.getElementById("codigoAleatorioErrado5").textContent = codigoAleatorioErrado5;

document.getElementById("codigoGerado5").style.display = "block";



const codigoAleatorio6 = generateRandomCode(7);
const codigoAleatorioErrado6 = generateRandomCode(7);

document.getElementById("codigoAleatorio6").textContent = codigoAleatorio6;

document.getElementById("codigoAleatorioCerto6").textContent = codigoAleatorio6;

document.getElementById("codigoAleatorioErrado6").textContent = codigoAleatorioErrado6;

document.getElementById("codigoGerado6").style.display = "block";



const codigoAleatorio7 = generateRandomCode(7);
const codigoAleatorioErrado7 = generateRandomCode(7);

document.getElementById("codigoAleatorio7").textContent = codigoAleatorio7;

document.getElementById("codigoAleatorioCerto7").textContent = codigoAleatorio7;

document.getElementById("codigoAleatorioErrado7").textContent = codigoAleatorioErrado7;

document.getElementById("codigoGerado7").style.display = "block";