'use strict';

var nodos = new Array();
var letrasInsertar = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
//Estructura

class Nodo {
  constructor(nombre) {
    this.nombre = nombre;
    this.arcos =  new Array();
    this.estado = null; // F = Final - I = Inicial  - null = none
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

function buscarPos (nombre){
  var i;
  for (i = 0; i < nodos.length; i++){
    if (nodos[i].nombre == nombre){
      return i;
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
  if (nodo==null){
    document.write("No se puede Cambiar el nodo: '"+nombreViejo+"' por que NO existe");
  }
  nodo.nombre=nombreNuevo;
}

function cambiarCostoArco(origen, destino, costo){
  var nodoOrigen = buscar(origen);
  var nodoDestino = buscar(destino);
  if ((nodoOrigen == null) || (nodoDestino == null)){
    document.write("Error de Cambio Costo de Arco en:"+origen+" a "+destino+" -> No existe alguno de los nodos");
    return;
  }

  for (var i = 0; i<nodoOrigen.arcos.length; i++){
    if (nodoOrigen.arcos[i].destino.nombre == nodoDestino.nombre){
      nodoOrigen.arcos[i].costo = costo;
    }
  }
}

//Poner Estado Inicial
//Poner Estado Final
//Eliminar nodo



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

  

  for (var i = 0; i < nodos.length; i++) {
    var nodosCant = nodos.length;
    var div2 = nodosCant/2;
    
    var cantArcos = getRandomInt(div2,nodosCant-1);

    for (var x = 0; x < cantArcos; x++) {

      var nodoNPos = getRandomInt(0, nodos.length-1);
      while (nodoNPos == i){
        nodoNPos = getRandomInt(0, nodos.length-1);
      }
      var costo = getRandomInt(1,500)
      insertarArco(costo,nodos[i].nombre,nodos[nodoNPos].nombre);
    }
  }
}

function imprimirNodos(){
  document.write("Imprimir: <br>");
  var i;
  for (i = 0; i < nodos.length; i++){
    document.write("====== "+nodos[i].nombre+" ======<br>");
    for (var x = 0; x < nodos[i].arcos.length; x++){
      document.write("--> "+nodos[i].arcos[x].destino.nombre+"<br> --->Costo: "+nodos[i].arcos[x].costo+"<br>");
    }
  }
}


//Busqueda en Grafos


/*
INSERTAR AQUI TODAS LAS FUNCIONES DE BUSQUEDA A IMPLEMENTAR
*/


insertarNodo("A");
insertarNodo("B");
insertarNodo("C");
insertarArco(30,"C","A");
insertarNodo("D");

<<<<<<< HEAD
imprimirNodos();
=======
insercionAutomaticaNodos(2000);
insertarNodoAbiertos("A");
>>>>>>> origin/master

//cambiarNombreNodo("A","Cambio");
cambiarCostoArco("C","A",20);

imprimirNodos();
<<<<<<< HEAD
//insercionAutomaticaNodos(10);



document.write(nodos.length);

=======




var cerrados = new Array();
var abiertos = new Array();
/*function insertarNodoCerrados(lista){
  var pos = cerrados.length;
  cerrados[pos] = lista;
}*/
function insertarNodoAbiertos(nodoOrigen){
  while(listaActual[listaActual.length-1]==nodoDestino.nombre){
    if (cerrados.length==null){
      var posi = cerrados.length;
      cerrados[posi] = nodoOrigen;//nodo.origen no se a creado, es el que el usuario selecciona para iniciar la busqueda
    }
    else{
      var listaActual = Array;
      listaActual = cerrados[cerrados.length-1];
      var pos = abiertos.length;

      var arcDestino = buscarH(listaActual);
      var sumatoria = listaActual.distancia+arcDestino.distancia;
      listaActual = listaActual +arcDestino.nombre;
      abiertos[pos] = (listaActual+sumatoria) ;
      abiertos[sumatoria].sort();
      cerrados[cerrados.length-1] = abiertos[0];
      abiertos[0].remove();
      document.write(abiertos); 

    }
  }
  
}   

function buscarH (listaActual){
  var ultNodoLista;
  ultNodoLista = listaActual[listaActual.length-1];
  for (i = 0; i < arcos.length; i++){
    if(arcos[i].origen==ultNodoLista){
      return arcos[i].destino;
    }
  }
}




function insertarAbiertos(nombre){
  if (buscar(nombre) != null){
    document.write("No se puede insertar el nodo: '"+nombre+"'' por que ya existe");
  }
 
}
 


 
>>>>>>> origin/master
