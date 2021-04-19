const crearNivel = () => {
  let tiempo = 1;
  let objetivo = 1;
  while (tiempo / objetivo < 1.5) {
  tiempo = Math.round(Math.random() * (30 - 5) + 5);
  objetivo = Math.round(Math.random() * (30 - 10) + 10);
  }
  return  {'tiempo': tiempo, 'objetivo': objetivo};
}

document.querySelector(".sigNiv").addEventListener("onclick", cambiarObjetivoYTiempo)

function cambiarObjetivoYTiempo() {
  objetivo = crearNivel()['objetivo'];
  tiempo = crearNivel()['tiempo'];
}
cambiarObjetivoYTiempo()
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
