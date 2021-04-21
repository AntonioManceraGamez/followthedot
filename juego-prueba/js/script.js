let velocidad = 1;
const moverLadoAbajo = () => {
  posicionY = 543;
  if (velocidad < 5) {
    velocidad = velocidad + 0.2
  }
  document.querySelector('.jugador').style.marginTop = posicionY + 'px';
  rand = Math.round(Math.random()*543);
  document.querySelector('.jugador').style.marginLeft = rand + 'px';
}

const moverArriba = () => {
  subiendo = setInterval(subirPixel, 1);
  posicionY = 543;
}

function subirPixel () {
  if (posicionY > 0) {
    posicionY = posicionY - velocidad;
  } if (posicionY < 1) {
    clearInterval(subiendo);
    alert('Has perdido');
  } if (posicionY < 0) {
    clearInterval(subiendo);
  }
  document.querySelector('.jugador').style.marginTop = posicionY + "px";
}

moverLadoAbajo();
moverArriba();
document.querySelector('.jugador').addEventListener('mouseover', moverLadoAbajo);
