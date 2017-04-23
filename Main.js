'use strict';

var nodos = new Array();
var letrasInsertar = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

//Estructura

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

//Funciones de Nodos

function insertarNodo(nombre){
  if (buscar(nombre) != null){
    document.write("No se puede insertar el nodo: '"+nombre+"'' por que ya existe");
  }
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

function insercionAutomaticaNodos(cantidad){
  //creacion de nodos
  var x = 0;
  var y = 1;
  var nombre = "";

  var contadores = new Array();

  for (var i = 0; i < cantidad; i++) {

      if (x>letrasInsertar.length){
        x = 0;
        y++;
      }

      for (var )

      nombre = letrasInsertar[0];+letrasInsertar[1]+letrasInsertar[2]+letrasInsertar[3]

      var pos = nodos.length;
      var nn;
      nn = new Nodo(nombre);
      nodos[pos] = nn;
  }

}


//Busqueda en Grafos


/*
INSERTAR AQUI TODAS LAS FUNCIONES DE BUSQUEDA A IMPLEMENTAR
*/

insertarNodo("A");
insertarNodo("B");
insertarNodo("C");
insertarArco(10,"C","A");
insertarNodo("D");


var pos = letrasInsertar.length;
document.write(pos);

var n = buscar("C");
document.write(n.arcos[0].costo);