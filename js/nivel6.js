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

  let tiempo = 1;
  let objetivo = 1;
  while (tiempo / objetivo < 1.5) {
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

document.querySelector(".sigNiv").addEventListener("onclick", cambiarObjetivoTiempoColores)

function cambiarObjetivoTiempoColores() {
  objetivo = crearNivel()['objetivo'];
  tiempo = crearNivel()['tiempo'];
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
cambiarObjetivoTiempoColores()
let puntos = 0;
let tiempoIni = tiempo;
const intervalo = setInterval(restarTiempo, 1000);
let sonidoPerder = new Audio('audios/perder.wav');
let sonidoTocar = new Audio('audios/tocar.flac');
let sonidoGanar = new Audio('audios/ganar.wav');

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
