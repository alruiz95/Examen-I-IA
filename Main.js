'use strict';

class Nodo {
  constructor(nombre) {
    this.nombre = nombre;
    this.arcos =  new Array();
  }
}

class Arco{
  constructor(costo,origen,destino){
    this.costo = costo;
    this.origen = origen;
    this.destino = destino
  }
}

var nodos = new Array();

function insertarNodo(nombre){
  var pos = nodos.length;
  var nn;
  nn = new Nodo(nombre);
  nodos[pos] = nn;
}

function

function 


insertarNodo("A");
insertarNodo("B");
insertarNodo("C");
insertarNodo("D");

var pos = nodos.length;
document.write(pos);