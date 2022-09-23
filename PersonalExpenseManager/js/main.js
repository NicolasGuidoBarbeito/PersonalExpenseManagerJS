class Ingreso{
    constructor(ingreso) {
        this.ingreso = parseFloat(ingreso);
    }
}


class Egreso{
    constructor(egreso) {
        this.egreso = parseFloat(egreso);
    }
}

var ingresos = [];
var egresos = [];


var contadorIngresos = 0;
var contadorEgresos = 0;

function ingresarIngreso(botonID){

    let ingreso;
    
    let saveButtonID = botonID.split("_").pop();

    let idIngreso = 'new-ingreso_' + saveButtonID;

    let ingresoAGuardar = document.getElementById(idIngreso);


    let ingresoValue = ingresoAGuardar.value

        if (isNaN(ingresoValue) === true || ingresoValue == null || ingresoValue === "") { /*EVALUA SI LO INGRESADO ES UN NUMERO */
            Swal.fire({
                title: 'Error!',
                text: 'Debe ingresar información válida. Debe ingresar un número!',
                icon: 'error',
                confimButtonText: 'OK'
            })
            return
        }

    if(ingresoValue <= 0) {
        Swal.fire({
            title: 'Error!',
            text: 'El número ingresado debe ser un número positivo (mayor a 0)',
            icon: 'error',
            confimButtonText: 'OK'
        })
        return
    }

    ingreso = new Ingreso(ingresoValue);

    ingresos.push(ingreso);

    localStorage.setItem("ingresos", JSON.stringify(ingresos));

    let saveButton = document.getElementById(botonID);

    saveButton.remove(); //Borro el boton save de la pantalla
}


function agregarIngreso(ingreso){

    var divIngresos = document.getElementById('contenedor-ingresos');

    nuevoIngresoHTML = document.createElement('div');

    nuevoIngresoHTML.class_name = 'contenedor-ingreso';

    contadorIngresos += 1;

    nuevoIngresoHTML.innerHTML = `
        <input type="text" id="new-ingreso_` + `${contadorIngresos}` + `"  class="new-ingreso"  value ="`+`${ingreso.ingreso}">
        <input type="submit" id="save-button_` + `${contadorIngresos}` + `" value="Save" class="save-button-ingreso">
    `;

    divIngresos.appendChild(nuevoIngresoHTML);

    let botonIngresarIngreso = document.getElementsByClassName("save-button-ingreso");
    for (boton of botonIngresarIngreso) {
        boton.addEventListener("click", (e) =>  {
            let elementId = e.target.id;
            ingresarIngreso(elementId);
        });
    }
}


function ingresarEgreso(botonID){

    let egreso;
    
    let saveButtonID = botonID.split("_").pop();

    let idEgreso = 'new-egreso_' + saveButtonID;

    let egresoAGuardar = document.getElementById(idEgreso);


    let egresoValue = egresoAGuardar.value 

        if( isNaN(egresoValue) === true || egresoValue == null || egresoValue === "") { /*EVALUA SI LO INGRESADO ES UN NUMERO */
            Swal.fire({
                title: 'Error!',
                text: 'Debe ingresar información válida. Debe ingresar un número!',
                icon: 'error',
                confimButtonText: 'OK'
            })
            return
        }

    if (egresoValue <= 0) {
        Swal.fire({
            title: 'Error!',
            text: 'El número ingresado debe ser un número positivo (mayor a 0)',
            icon: 'error',
            confimButtonText: 'OK'
        })
        return
    }

        egreso = new Egreso(egresoValue);

        egresos.push(egreso);

        localStorage.setItem("egresos", JSON.stringify(egresos));

    let saveButton = document.getElementById(botonID);

    saveButton.remove(); //Borro el boton save de la pantalla
}

function agregarEgreso(egreso){

    var divEgresos = document.getElementById('contenedor-egresos');

    nuevoEgresoHTML = document.createElement('div');

    nuevoEgresoHTML.class_name = 'contenedor-egreso';

    contadorEgresos += 1;

    nuevoEgresoHTML.innerHTML = `
        <input type="text" id="new-egreso_` + `${contadorEgresos}` + `"  class="new-egreso"  value ="`+`${egreso.egreso}">
        <input type="submit" id="save-button_` + `${contadorEgresos}` + `" value="Save" class="save-button-egreso">
    `;

    divEgresos.appendChild(nuevoEgresoHTML);

    let botonIngresarEgreso = document.getElementsByClassName("save-button-egreso");
    for (boton of botonIngresarEgreso) {
        boton.addEventListener("click", (e) =>  {
            let elementId = e.target.id;
            ingresarEgreso(elementId);
        });
    }
}

function sumarOperaciones(){
    let sumaIngresos = 0;
    let sumaEgresos = 0;
    let balance;
    let ingresosGuardadosComoClase = [new Ingreso(0)];
    let egresosGuardadosComoClase = [new Egreso(0)];

    ingresosGuardados = JSON.parse(localStorage.getItem("ingresos"));

    egresosGuardados = JSON.parse(localStorage.getItem("egresos"));

    for (ingresoGuardado of ingresosGuardados){
        ingresosGuardadosComoClase.push(new Ingreso(ingresoGuardado.ingreso));
    }

    for (egresoGuardado of egresosGuardados){
        egresosGuardadosComoClase.push(new Egreso(egresoGuardado.egreso));
    }

    for(ingresoASumar of ingresosGuardadosComoClase){
        sumaIngresos += parseFloat(ingresoASumar.ingreso);
    }

    for(egresoASumar of egresosGuardadosComoClase){
        sumaEgresos -= parseFloat(egresoASumar.egreso);
    }

    balance = sumaIngresos + sumaEgresos;

    var divBalance = document.getElementById('contenedor-balance');


    var divBalanceResult = document.getElementById('balance_result');


    divBalanceResult !== null && divBalanceResult.remove();

    let balanceHTML = document.createElement("div");

    balanceHTML.id = "balance_result";

    let colorBalance = "yellow";

    if(balance > 0){
        colorBalance = "green";
    } 
    
    if(balance < 0){
        colorBalance = "red"
    }

    balanceHTML.innerHTML = `<h1 style="color:${colorBalance};"> $ ${balance}</h1>`

    if(isNaN(balance) === true){
        balanceHTML.innerHTML = `<h1 style="color:blue"> No se puede calcular el balance debido a que hay información errónea. Corregir!</h1>`
    }

    divBalance.appendChild(balanceHTML);

}

let botonAgregarIngreso = document.getElementById("agregarIngreso");
botonAgregarIngreso.addEventListener("click", () => agregarIngreso(new Ingreso(0)));

let botonAgregarEgreso = document.getElementById("agregarEgreso");
botonAgregarEgreso.addEventListener("click", () => agregarEgreso(new Egreso(0)));

let botonCalcularBalance = document.getElementById("calcularBalance");
botonCalcularBalance.addEventListener("click", sumarOperaciones);

/*
function showIngresosAndEgresos(){

    ingresosGuardados = JSON.parse(localStorage.getItem("ingresos"));

    egresosGuardados = JSON.parse(localStorage.getItem("egresos"));

    for (ingresoGuardado of ingresosGuardados){
        agregarIngreso(ingresoGuardado);
    }

    for (egresoGuardado of egresosGuardados){
        agregarEgreso(egresoGuardado);
    }
}

window.onload = showIngresosAndEgresos;
*/