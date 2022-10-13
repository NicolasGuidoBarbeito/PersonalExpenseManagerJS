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
                confirmButtonText: 'OK'
            })
            return
        }

    if(ingresoValue <= 0) {
        Swal.fire({
            title: 'Error!',
            text: 'El número ingresado debe ser un número positivo (mayor a 0)',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return
    }

    ingreso = new Ingreso(ingresoValue);

    ingresos.push(ingreso);

    let saveButton = document.getElementById(botonID);

    saveButton.remove(); //Borro el boton save de la pantalla

    Toastify({
        text: "Ingreso agregado correctamente!",
        duration: 3000
    }).showToast();

    sumarOperaciones();
}


function agregarIngreso(ingreso){

    var divIngresos = document.getElementById('contenedor-ingresos');

    let ingresosAgregados = document.getElementsByClassName("new-ingreso");

    if (ingresosAgregados.length !== 0){
        let ultimoIngreso = ingresosAgregados[ingresosAgregados.length-1];
        if(ultimoIngreso.value === '0'){
            Toastify({
                text: "Ya tiene un ingreso disponible para agregar!",
                duration: 3000
            }).showToast();
            return
        }
    }


    nuevoIngresoHTML = document.createElement('div');

    nuevoIngresoHTML.class_name = 'contenedor-ingreso';

    contadorIngresos += 1;

    nuevoIngresoHTML.innerHTML = `
        <input type="text" id="new-ingreso_` + `${contadorIngresos}` + `"  class="new-ingreso"  value ="`+`${ingreso.ingreso}">
        <input type="submit" id="save-button_ingreso_` + `${contadorIngresos}` + `" value="Save" class="save-button-ingreso">
    `;

    divIngresos.appendChild(nuevoIngresoHTML);

    let botonIngresarIngreso = document.getElementById("save-button_ingreso_" + `${contadorIngresos}`);
    botonIngresarIngreso.addEventListener("click", (e) =>  {
            let elementId = e.target.id;
            ingresarIngreso(elementId);
        });
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

    let saveButton = document.getElementById(botonID);

    saveButton.remove(); //Borro el boton save de la pantalla

    Toastify({
        text: "Egreso agregado correctamente!",
        duration: 3000
    }).showToast();

    sumarOperaciones();
}

function agregarEgreso(egreso){

    var divEgresos = document.getElementById('contenedor-egresos');


    let egresosAgregados = document.getElementsByClassName("new-egreso");

    if (egresosAgregados.length !== 0){
        let ultimoEgreso = egresosAgregados[egresosAgregados.length-1];
        if(ultimoEgreso.value === '0'){
            Toastify({
                text: "Ya tiene un egreso disponible para agregar!",
                duration: 3000
            }).showToast();
            return
        }
    }

    nuevoEgresoHTML = document.createElement('div');

    nuevoEgresoHTML.class_name = 'contenedor-egreso';

    contadorEgresos += 1;

    nuevoEgresoHTML.innerHTML = `
        <input type="text" id="new-egreso_` + `${contadorEgresos}` + `"  class="new-egreso"  value ="`+`${egreso.egreso}">
        <input type="submit" id="save-button_egreso_` + `${contadorEgresos}` + `" value="Save" class="save-button-egreso">
    `;

    divEgresos.appendChild(nuevoEgresoHTML);

    let botonIngresarEgreso = document.getElementById("save-button_egreso_" + `${contadorEgresos}`);
    botonIngresarEgreso.addEventListener("click", (e) =>  {
        let elementId = e.target.id;
        ingresarEgreso(elementId);
    });
}

function sumarOperaciones(){
    let sumaIngresos = 0;
    let sumaEgresos = 0;
    let balance;

    for(ingresoASumar of ingresos){
        sumaIngresos += parseFloat(ingresoASumar.ingreso);
    }

    for(egresoASumar of egresos){
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

fetch ('./egresos.json').then( (res) => res.json())
    .then( dataJson => {

        dataJson.forEach( egresoJson => {
        agregarEgreso(new Egreso(egresoJson.egreso))
        })
    })

fetch ('./ingresos.json').then( (res) => res.json())
    .then( dataJson => {

        dataJson.forEach( ingresoJson => {
            agregarIngreso(new Ingreso(ingresoJson.ingreso))
        })
    })