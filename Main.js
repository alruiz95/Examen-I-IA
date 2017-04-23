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
//Funciones Extras

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
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

function existeArco(origen,destino){
  var nodoOrigen = buscar(origen);
  if (nodoOrigen == null){
    return false;
  }

  for (var i = 0; i<nodoOrigen.arcos.length; i++){
    if (nodoOrigen.arcos[i].nombre == destino){
      return true;
    }
  }

  return false;

}

function insertarArco(peso, origen,destino){
  var nodoOrigen = buscar(origen);
  var nodoDestino = buscar(destino);
  if ((nodoOrigen == null) || (nodoDestino == null)){
    document.write("Error de Insercion de Arco:"+origen+" a "+destino+" -> No existe alguno de los nodos");
    return;
  }

  if (existeArco()){
    document.write("Error de Insercion de Arco:"+origen+" a "+destino+" -> Ya existe.");
    return;
  }

  var na;
  na = new Arco(peso,nodoDestino);
  var pos = nodoOrigen.arcos.length;
  nodoOrigen.arcos[pos] = na;
}

function cambiarNombreNodo(nombreViejo,nombreNuevo){
  var nodo = buscar(nombreViejo);
  if (nodo){
    document.write("No se puede insertar el nodo: '"+nombre+"' por que ya existe");
  }
  nodo.nombre=nombreNuevo;
  /*for (var i = 0 ; i< nodos.length; i++){
    for (var x = 0; x < nodos[i].arcos.length; x++){
      if (nodos[i].arcos[x].nodoDestino.nombre == nombreViejo){
        nodos[i].arcos[x].nodoDestino.nombre = 
      }
    }
  }*/
}

function cambiarCostoArco(origen, destino, costo){
  var nodoOrigen = buscar(origen);
  var nodoDestino = buscar(destino);
  if ((nodoOrigen == null) || (nodoDestino == null)){
    document.write("Error de Cambio Costo de Arco en:"+origen+" a "+destino+" -> No existe alguno de los nodos");
    return;
  }

  for (var i = 0; i<nodoOrigen.arcos.length; i++){
    if (nodoOrigen.arcos[i].nombre == nodoDestino){
      nodoOrigen.arcos[i].costo = costo;
    }
  }
}

function insercionAutomaticaNodos(cantidad){
  //creacion de nodos
  
  var contadores = new Array();
  contadores[0]=0;

  for (var i = 0; i < cantidad; i++) {

      var lastCont = contadores.length;
      
      for (var posConts = lastCont; posConts>=0 ; posConts--){

        if (contadores[posConts] >= letrasInsertar.length){


          contadores[posConts] = 0;


          if (posConts == 0){
            contadores[lastCont]=0;
          }else{
            contadores[posConts-1] ++;
          }


        }

      }

      var nombre = "";
      for (var toIns = 0; toIns<contadores.length; toIns++){
        nombre += letrasInsertar[contadores[toIns]];
      }

      insertarNodo(nombre);


      contadores[lastCont-1] ++;
  }

}

function imprimirNodos(){
  document.write("Imprimir: <br>");
  var i;
  for (i = 0; i < nodos.length; i++){
    document.write(nodos[i].nombre+"<br>");
  }
}


//Busqueda en Grafos


/*
INSERTAR AQUI TODAS LAS FUNCIONES DE BUSQUEDA A IMPLEMENTAR
*/

/*
insertarNodo("A");
insertarNodo("B");
insertarNodo("C");
insertarArco(10,"C","A");
insertarNodo("D");
*/

insercionAutomaticaNodos(2000);


var pos = nodos.length;
document.write(pos);
imprimirNodos();
