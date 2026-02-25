function traducir() {
    document.getElementById("par1").innerHTML =
        "Este texto fue cambiado con JavaScript";
}

function cambiarFondo() {

    let fondoActual = document.body.style.backgroundColor;

    if (fondoActual === "black") {
        document.body.style.backgroundColor = "#3BD2D9";
    } else {
        document.body.style.backgroundColor = "black";
    }

}