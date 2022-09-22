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

localStorage.setItem('ingresos', ingresos);
localStorage.setItem('egresos', egresos);

var contadorIngresos = 0;
var contadorEgresos = 0;

function ingresarIngreso(botonID){

    let ingreso;
    
    let saveButtonID = botonID.split("_").pop();

    let idIngreso = 'new-ingreso_' + saveButtonID;

    let ingresoAGuardar = document.getElementById(idIngreso);


    let ingresoValue = ingresoAGuardar.value 

        if( isNaN(ingresoValue) == true || ingresoValue == null || ingresoValue == "") { /*EVALUA SI LO INGRESADO ES UN NUMERO */
            alert("Debe ingresar información válida. Debe ingresar un número!")
            return
        }
    
        if(ingresoValue <= 0) {
            ingresoValue = alert("El número ingresado debe ser un número positivo (mayor a 0)");
            return
        }

        //faltaria sacar el ingreso que actualizas

        ingreso = new Ingreso(ingresoValue);

        ingresos.push(ingreso);

        localStorage.setItem(ingreso, JSON.stringify(ingreso));
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

        if( isNaN(egresoValue) == true || egresoValue == null || egresoValue == "") { /*EVALUA SI LO INGRESADO ES UN NUMERO */
            alert("Debe ingresar información válida. Debe ingresar un número!")
            return
        }
    
        if(egresoValue <= 0) {
            egresoValue = alert("El número ingresado debe ser un número positivo (mayor a 0)");
            return
        }

        //faltaria sacar el egreso que actualizas

        egreso = new Egreso(egresoValue);

        egresos.push(egreso);
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

    let botonIngresarEgreso = document.getElementsById(`save-button_` + `${contadorEgresos}`);
        
    botonIngresarEgreso.addEventListener("click", (e) =>  {
            let elementId = e.target.id;
            ingresarEgreso(elementId);
        });
}


function sumarIngresos(valorA, valorB){
    return valorA.ingreso + valorB.ingreso;
}

function sumarEgresos(valorA, valorB){
    return valorA.egreso + valorB.egreso;
}

function sumarOperaciones(){
    let sumaIngresos = 0;
    let sumaEgresos = 0;
    let balance = 0;


    let montoIngresosIngresados = document.getElementsByClassName("new-ingreso");

    let montoEgresosIngresados = document.getElementsByClassName("new-egreso");

    for(montoIngreso of montoIngresosIngresados){
        sumaIngresos += parseFloat(montoIngreso.value)
    }

    
    for(montoEgreso of montoEgresosIngresados){
        sumaEgresos -= parseFloat(montoEgreso.value)
    }

    balance = sumaIngresos + sumaEgresos;

    var divBalance = document.getElementById('contenedor-balance');


    var divBalanceResult = document.getElementById('balance_result');


    if(divBalanceResult !== null){
        divBalanceResult.remove();
    }

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

    if(isNaN(balance) == true){
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

