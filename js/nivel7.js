const crearColor = () => {
  let r = Math.round(Math.random()*255);
  let g = Math.round(Math.random()*255);
  let b = Math.round(Math.random()*255);
  let R = r.toString(16);
  let G = g.toString(16);
  let B = b.toString(16);
  let RGB = "#" + R + G + B;
  return RGB;
}
const crearNivel = () => {

  let tiempo = .5;
  let objetivo = 1;
  while (tiempo / objetivo < .6) {
    tiempo = Math.round(Math.random() * (30 - 5) + 5);
    objetivo = Math.round(Math.random() * (30 - 10) + 10);
  }
  let colorBordeCaja = crearColor();
  let colorRellenoCaja = crearColor();
  let colorBordeJugador = crearColor();
  let colorRellenoJugador = crearColor();
  return  {
    'tiempo': tiempo,
    'objetivo': objetivo,
    'colorRellenoJugador': colorRellenoJugador,
    'colorBordeJugador': colorBordeJugador,
    'colorRellenoCaja': colorRellenoCaja,
    'colorBordeCaja': colorBordeCaja
  }
}


function cambiarColores() {
  let colorRellenoCaja = crearNivel()['colorRellenoCaja'];
  let colorBordeCaja = crearNivel()['colorBordeCaja'];
  let colorRellenoJugador = crearNivel()['colorRellenoJugador'];
  let colorBordeJugador = crearNivel()['colorBordeJugador'];
  document.querySelector('.campo').style.backgroundColor = colorRellenoCaja;
  document.querySelector('.campo').style.borderColor = colorBordeCaja;
  document.querySelector('.jugador').style.backgroundColor = colorRellenoJugador;
  document.querySelector('.jugador').style.borderColor = colorBordeJugador;
  document.querySelector('.contador').style.borderColor = colorBordeCaja;
}

let sonidoPerder = new Audio('audios/perder.wav');
let sonidoTocar = new Audio('audios/tocar.flac');
let sonidoGanar = new Audio('audios/ganar.wav');


document.querySelector(".sigNiv").addEventListener("onclick", elegirJuego)
elegirJuego()

function elegirJuego () {
  juego = 1;
  let rand = Math.round(Math.random()*2);
  if (rand == 0) {
    juego = 1;
  }
  if (rand == 1) {
    juego = 2;
  }

}
if (juego == 1) {
  function cambiarObjetivoTiempo () {
    objetivo = crearNivel()['objetivo'];
    tiempo = crearNivel()['tiempo'];
  }

  function cambiarObjetivoTiempoColores () {
    cambiarObjetivoTiempo();
    cambiarColores();
  }
  cambiarObjetivoTiempoColores()
  let puntos = 0;
  let tiempoIni = tiempo;
  const intervalo = setInterval(restarTiempo, 1000);

  document.querySelector(".jugador").addEventListener("mouseover", sumarPunto);
  document.querySelector(".puntos").innerHTML = "Puntos: <b>"+ puntos +"</b> / <b>" + objetivo + "</b>";
  document.querySelector(".tiempo").innerHTML = "Tiempo: <b>"+ tiempo +"</b>";

  function sumarPunto() {
      puntos++;
      sonidoTocar.play();
      document.querySelector(".puntos").innerHTML = "Puntos: <b>"+ puntos +"</b> / <b>" + objetivo + "</b>";
      rand1 = Math.round(Math.random()*542);
      rand2 = Math.round(Math.random()*542);
      document.querySelector(".jugador").style.marginLeft = rand1 + "px";
      document.querySelector(".jugador").style.marginTop = rand2 + "px";
      if (puntos == objetivo) {
	  sonidoGanar.play();
	  alert("Has ganado");
	  clearInterval(intervalo);
	  document.querySelector(".sigNiv").style.display = "block";
      }
  }

  function restarTiempo () {
      tiempo--;
      document.querySelector(".tiempo").innerHTML = "Tiempo: <b>"+ tiempo +"</b>";
      if (tiempo <= 0) {
	  sonidoPerder.play();
	  alert('Has perdido');
	  puntos = 0;
	  tiempo = tiempoIni;
      }
  }
}
if (juego == 2) {
  cambiarColores();
  document.querySelector('.jugador').style.transition = 'none';
  let velocidad = 1;
  let objetivo = Math.floor(Math.random() * (20 - 10 + 1) + 10);
  let puntos = 0;

  const moverLadoAbajo = () => {
    posicionY = 543;
    if (velocidad < 5) {
      velocidad = velocidad + 0.1
    }
    sonidoTocar.play();
    document.querySelector('.jugador').style.marginTop = posicionY + 'px';
    rand = Math.round(Math.random()*543);
    document.querySelector('.jugador').style.marginLeft = rand + 'px';
    document.querySelector('.puntos').innerHTML = 'Puntos: <b>' + puntos + '<b>/<b>' + objetivo + '</b>'
    if (puntos >= objetivo) {
      sonidoGanar.play();
      alert('Has ganado');
      clearInterval(subiendo)
      document.querySelector('.sigNiv').style.display = 'block';
    }
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
    }
    document.querySelector('.jugador').style.marginTop = posicionY + "px";
  }

  moverLadoAbajo();
  moverArriba();
  document.querySelector('.jugador').addEventListener('mouseover', moverLadoAbajo);
}
