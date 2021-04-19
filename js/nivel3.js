let puntos = 0;
let objetivo = 10;
let tiempo = 7;

let sonidoPerder = new Audio("audios/perder.wav");
let sonidoGanar = new Audio("audios/ganar.wav");
let sonidoTocar = new Audio("audios/tocar.flac");


let intervalo = setInterval(restarTiempo, 1000);

document.querySelector(".tiempo").innerHTML = "Tiempo: <b>" + tiempo + "</b>";
document.querySelector(".puntos").innerHTML = "Puntos: <b>" + puntos + "</b>/<b>" + objetivo + "</b>";


document.querySelector(".jugador").addEventListener("mouseover",sumarPuntos);

function sumarPuntos(){
    puntos++;
    sonidoTocar.play();
    document.querySelector(".puntos").innerHTML = "Puntos: <b>" + puntos + "</b>/<b>" + objetivo + "</b>";
    document.querySelector(".jugador").style.marginLeft = Math.round(Math.random() * 542) + "px";
    document.querySelector(".jugador").style.marginTop = Math.round(Math.random() * 542) + "px";
    if (puntos == objetivo) {
        sonidoGanar.play();
        alert("Has ganado");
        document.querySelector(".sigNiv").style.display = "block";
        clearInterval(intervalo);
    }
}

function restarTiempo() {
    tiempo--;
    document.querySelector(".tiempo").innerHTML = "Tiempo: <b>" + tiempo + "</b>";
    if (tiempo <= 0) {
        sonidoPerder.play();
        alert("Has perdido");
        tiempo = 8;
        puntos = 0;    }
    

}
