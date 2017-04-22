'use strict';

class Nodo {
  constructor(nombre) {
    this.nombre = nombre;
    this.arcos =  new Array();
  }
}

class Arco{
  constructor(costo,destino){
    this.costo = costo;
    this.destino = destino;
  }
}

var nodos = new Array();

function insertarNodo(nombre){
  var pos = nodos.length;
  var nn;
  nn = new Nodo(nombre);
  nodos[pos] = nn;
}

function buscar (nombre){
  var i;
  for (i = 0; i < nodos.length; i++){
    if (nodos[i].nombre == nombre){
      return nodos[i];
    }
  }
  return null;
}

function insertarArco(peso, origen,destino){
  var nodoOrigen = buscar(origen);
  var nodoDestino = buscar(destino);
  if ((nodoOrigen == null) || (nodoDestino == null)){
    document.write("Error de Insercion de Arco:"+origen+" a "+destino);
    return;
  }
  var na;
  na = new Arco(peso,nodoDestino);
  var pos = nodoOrigen.arcos.length;
  nodoOrigen.arcos[pos] = na;
}


insertarNodo("A");
insertarNodo("B");
insertarNodo("C");
insertarArco(10,"C","A");
insertarNodo("D");

var pos = nodos.length;
document.write(pos);
var n = buscar("C");
document.write(n.arcos[0].costo);