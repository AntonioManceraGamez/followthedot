document.querySelector('.jugador').style.transition = 'none';
let velocidad = 1;
let objetivo = 9;
let puntos = 0;

let sonidoPerder = new Audio("audios/perder.wav");
let sonidoGanar = new Audio("audios/ganar.wav");
let sonidoTocar = new Audio("audios/tocar.flac");

const moverLadoAbajo = () => {
  document.querySelector('.puntos').innerHTML = 'Puntos: <b>0<b>/<b>' + objetivo + '</b>';
  posicionY = 543;
  if (velocidad < 5) {
    velocidad = velocidad + 0.1;
  }
  document.querySelector('.jugador').style.marginTop = posicionY + 'px';
  rand = Math.round(Math.random()*543);
  document.querySelector('.jugador').style.marginLeft = rand + 'px';
  document.querySelector('.puntos').innerHTML = 'Puntos: <b>' + puntos + '<b>/<b>' + objetivo + '</b>';
  if (puntos >= objetivo) {
    sonidoGanar.play();
    alert('Has ganado');
    clearInterval(subiendo)
    document.querySelector('.sigNiv').style.display = 'block';
  }
  sonidoTocar.play();
  puntos++;
}

const moverArriba = () => {
  subiendo = setInterval(subirPixel, 1);
  posicionY = 543;
}

function subirPixel () {
  if (posicionY > 0) {
    posicionY = posicionY - velocidad;
  } if (posicionY < 1) {
    sonidoPerder.play();
    puntos = 1;
    velocidad = 1;
    document.querySelector('.puntos').innerHTML = 'Puntos: <b>0<b>/<b>' + objetivo + '</b>';
    alert('Has perdido');
    posicionY = 543;
    document.querySelector('.jugador').style.marginTop = '543px';
  } if (posicionY < 0) {
    clearInterval(subiendo);
  }
  document.querySelector('.jugador').style.marginTop = posicionY + "px";
}


moverLadoAbajo();
moverArriba();
document.querySelector('.jugador').addEventListener('mouseover', moverLadoAbajo);
