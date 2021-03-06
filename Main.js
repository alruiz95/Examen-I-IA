'use strict';


var nodos = new Array();
var letrasInsertar = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
//Estructura

class Nodo {
  constructor(nombre) {
    this.nombre = nombre;
    this.arcos =  new Array();
    this.estado = null; // F = Final - I = Inicial  - null = none
    this.visitado = false;
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
    if (nodoOrigen.arcos[i].destino.nombre == destino){
      return true;
    }
  }

  return false;

}

function costoArco(origen,destino){
  var nodoOrigen = buscar(origen);
  if (nodoOrigen == null){
    return 0;
  }

  for (var i = 0; i<nodoOrigen.arcos.length; i++){
    if (nodoOrigen.arcos[i].destino.nombre == destino){
      return nodoOrigen.arcos[i].costo;
    }
  }

  return 0;
}

function insertarArco(peso, origen,destino){
  var nodoOrigen = buscar(origen);
  var nodoDestino = buscar(destino);
  if ((nodoOrigen == null) || (nodoDestino == null)){
    document.write("Error de Insercion de Arco:"+origen+" a "+destino+" -> No existe alguno de los nodos");
    return false;
  }

  if (existeArco(origen,destino)){
    document.write("Error de Insercion de Arco:"+origen+" a "+destino+" -> Ya existe. <br>");
    return false;
  }

  var na;
  na = new Arco(peso,nodoDestino);
  var pos = nodoOrigen.arcos.length;
  nodoOrigen.arcos[pos] = na;
  return true;
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

function estadoInicial(nombre){
  nodo = buscar(nombre);
  nodo.estado = "I";
}

function estadoFinal(nombre){
  nodo = buscar(nombre);
  nodo.estado = "F";
}

function elimnarNodo(nombre){
  for (var i = 0; i < nodos.length; i++) {
    for (var x = 0; x < nodos[i].arcos.length; x++) {
      if(nodos[i].arcos[x].destino.nombre == nombre){
          nodos[i].arcos.splice(x, 1);
      }
    }
  }
  for (var i = 0; i < nodos.length; i++) {
    if (nodos[i].nombre == nombre){
      nodos.splice(i, 1);
    }
  }
}



function insercionAutomaticaNodos(cantidad){
  //creacion de nodos
  nodos = new Array();
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

      do{
        var nodoNPos = getRandomInt(0, nodos.length);
        while (nodoNPos == i){
          nodoNPos = getRandomInt(0, nodos.length);
        }
        var costo = getRandomInt(1,500)
      }while(insertarArco(costo,nodos[i].nombre,nodos[nodoNPos].nombre)==false);
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

function imprimirStack(stack){
  if (stack==null){
    return;
  }
  stack.reverse();
  while(stack.length>0){
    document.write(stack.pop().nombre+",")
  }
  document.write("<br>");
}

function downloadFile(filename, dataValue) {

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataValue));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

function readTextFile() {
  /*document.write("<input id=\"uploadText\" style=\"width:120px\" type=\"file\" size=\"10\"  onchange=\"PreviewText();\" />");


     function PreviewText() {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("uploadText").files[0]);
            oFReader.onload = function (oFREvent) {
                return = oFREvent.target.result;
            };
        };
  */
}


function exportJson(){
  var exportar = "{ \n \"nodos\":[ \n";
  var i;
  for (i = 0; i < nodos.length-1; i++) {
    var est;
    if (nodos[i].estado == null) {
      est = "null";
    }else{
      est = nodos[i].estado;
    }
    exportar += "{ \n \"nombre\":\""+nodos[i].nombre+"\",\n \"estado\":\""+est+"\" ,\n \"arcos\":[\n";
    var x;
    for ( x = 0; x < nodos[i].arcos.length-1; x++) {
      exportar += "{\n\"costo\":\""+nodos[i].arcos[x].costo+"\",\n \"destino\":\""+nodos[i].arcos[x].destino.nombre+"\" \n},\n";
    }
    exportar += "{\n\"costo\":\""+nodos[i].arcos[nodos[i].arcos.length-1].costo+"\",\n \"destino\":\""+nodos[i].arcos[nodos[i].arcos.length-1].destino.nombre+"\"\n}\n";
    exportar +="]},";
  }
  var lN = nodos.length-1
  var est;
  if (nodos[lN].estado == null) {
    est = "null";
  }else{
    est = nodos[lN].estado;
  }
  exportar += "{\"nombre\":\""+nodos[lN].nombre+"\", \"estado\":\""+est+"\", \"arcos\":[";
   var x;
    for ( x = 0; x < nodos[lN].arcos.length-1; x++) {
      exportar += "{\n\"costo\":\""+nodos[lN].arcos[x].costo+"\",\n \"destino\":\""+nodos[lN].arcos[x].destino.nombre+"\" \n},\n";
    }
    exportar += "{\n\"costo\":\""+nodos[lN].arcos[nodos[lN].arcos.length-1].costo+"\",\n \"destino\":\""+nodos[lN].arcos[nodos[lN].arcos.length-1].destino.nombre+"\"\n}\n";
    
  exportar += "]}]}";


  return exportar;
}

function importJson(string){
  nodos = new Array();
  var obj = JSON.parse(string);
  for (var i = 0; i < obj.nodos.length; i++) {
    insertarNodo(obj.nodos[i].nombre);
    nodos[i].estado = obj.nodos[i].estado;
  }
  for (var i = 0;i<nodos.length;i++){
    for (var x = 0; x < obj.nodos[i].arcos.length; x++) {
      insertarArco(obj.nodos[i].arcos[x].costo , obj.nodos[i].nombre , obj.nodos[i].arcos[x].destino);
    }
  }
}

//Busqueda en Grafos


/*
INSERTAR AQUI TODAS LAS FUNCIONES DE BUSQUEDA A IMPLEMENTAR
*/




function dfs( rais, goal ){
  var node;
  var to;
  var stack = [];
  var Nroot = buscar(rais);
  var NodoM = buscar(goal);
  if (Nroot == null || NodoM == null){
    document.write("Error1");
    return;
  }
  Nroot.visitado=true;
  stack.push(Nroot);
  while (true) {
    
    var node = stack.pop();
    stack.push(node);
    document.write(stack.length+" ");
    if (node.nombre == NodoM.nombre){
     break;
    }
    var Nmetio = true;
    for (var i = 0 ; i <node.arcos.length ; i++) {
      if (node.arcos[i].destino.visitado ==  false) {
        node.arcos[i].destino.visitado = true;
        stack.push(node.arcos[i].destino);
        Nmetio = false;
      }
    }
    if (Nmetio){
      stack.pop();
    }
  }
  return stack;
}

function dlimiteds( rais, goal,limitacion){
  var node;
  var to;
  var stack = [];
  var Nroot = buscar(rais);
  var NodoM = buscar(goal);
  if (Nroot == null || NodoM == null){
    document.write("Error1");
    return;
  }

  Nroot.visitado=true;
  stack.push(Nroot);

  while (true) {
    
    var node = stack.pop();

    if (node == null){
      document.write("No se pudo encontrar <br>");
      return null;
    }

    stack.push(node);

    if (node.nombre == NodoM.nombre){
     break;
    }
    var Nmetio = true;
    
    if(stack.length<limitacion-1){
      for (var i = 0 ; i <node.arcos.length ; i++) {
        if (node.arcos[i].destino.visitado ==  false) {
          node.arcos[i].destino.visitado = true;
          stack.push(node.arcos[i].destino);
          Nmetio = false;
        }
      }
    }
    if (Nmetio){
      stack.pop();
    }
  }
  return stack;
}

var listaCerrados = new Array();
var listaAbiertos = new Array();

function compare(lista1,lista2) {
  var costo1 = 0;
  for (var i = 0; i<lista1.length; i++){
    if(lista1[i+1]!= null){
      costo1 += costoArco(lista1[i].nombre,lista1[i+1].nombre);
    }
  }

  var costo2 = 0;
  for (var i = 0; i<lista2.length; i++){
    if(lista2[i+1]!= null){
      costo2 += costoArco(lista2[i].nombre,lista2[i+1].nombre);
    }
  }

  if (costo1 < costo2)
    return -1;
  if (costo1 > costo2)
    return 1;
  return 0;
}

function exiteEnCerrados(nodo){
  for (var i = 0; i < listaCerrados.length; i++) {
    if (listaCerrados[i].nombre == nodo.nombre){
      return true;
    }
  }
  return false;
}

function insertarCerrados(nodo){
  for (var i = 0; i < listaCerrados.length; i++) {
    if (listaCerrados[i].nombre == nodo.nombre){
      return null;
    }
  }
  listaCerrados.push(nodo);
}

function insertarAbiertos(lista){
  var pos = listaAbiertos.length;
  listaAbiertos[pos] = lista;
}

function ultimoListaAbiertos(){
  var count = listaAbiertos[0].length;
  return listaAbiertos[0][count-1];
}


function imprimirAbiertos(){
  document.write("[");
  for (var i = 0; i < listaAbiertos.length; i++) {
    document.write("[");
    for (var x = 0; x < listaAbiertos[i].length; x++){
      document.write(listaAbiertos[i][x].nombre+ ",");
    }
    document.write("],");
  }
  document.write("]<br>=====<br>");
}
function imprimirCerrados(){
  document.write("Cerrados: ");
  for (var i = 0; i < listaCerrados.length; i++) {
    document.write( listaCerrados[i].nombre+ ", " );
  }
  document.write("<br>");
}

function costoUniforme(rais, goal){
  listaCerrados = new Array();
  listaAbiertos = new Array();

  var nodoIni = buscar(rais);
  insertarCerrados(nodoIni);

  var listaAnterior = new Array();
  listaAnterior[0] = nodoIni;

  while(true){

    if (listaCerrados.length > nodos.length){
      document.write("no se pudo encontrar");
      return null;
    }
    

    var lastCPos = (listaCerrados.length)-1;
    var lastNC = listaCerrados[lastCPos];

    var lastPosAnt = listaAnterior.length;

    for (var i = 0; i<lastNC.arcos.length; i++){
      var listaAins = listaAnterior.slice();
      listaAins[lastPosAnt] = lastNC.arcos[i].destino;
      insertarAbiertos(listaAins);
    }
    
    for (var i = 0; i<listaAbiertos.length; i++){
      var count = listaAbiertos[i].length;
      var comp = listaAbiertos[i][count-1];
      if (exiteEnCerrados(comp)){
        listaAbiertos.splice(i,1);
      }
    }

    listaAbiertos.sort(compare);
    imprimirCerrados();
    imprimirAbiertos();
    var ultA = ultimoListaAbiertos();

    for (var i = 0; i<listaAbiertos.length; i++){
      var count = listaAbiertos[i].length;
      var comp = listaAbiertos[i][count-1];
      if (exiteEnCerrados(comp)){
        listaAbiertos.splice(i,1);
      }
    }
    
    while (exiteEnCerrados(ultA.nombre)){
      document.write("enta");
      listaAbiertos.splice(0,1);
      ultA = ultimoListaAbiertos();
    }

    insertarCerrados(ultA);
    listaAnterior = listaAbiertos[0];
    if(ultA.nombre == goal){
      return listaAbiertos[0];
    }
    listaAbiertos.splice(0,1);
  }
}

function imprimirCostoUni(lista){
  if (lista==null){
    return;
  }
  for (var i = 0; i < lista.length; i++) {
    document.write(lista[i].nombre + ",");
  }
  document.write("<br>");
}


insercionAutomaticaNodos(20);
/*insertarNodo("A");
insertarNodo("B");
insertarNodo("C");
insertarArco(30,"C","A");
insertarNodo("D");

imprimirNodos();
//cambiarNombreNodo("A","Cambio");
cambiarCostoArco("C","A",20);*/


//insertarNodoAbiertos("A");

document.write(nodos.length);
//imprimirStack(DFS("A","B"));

//downloadFile("archivoJsonNodos.json",exportJson());
//importJson(exportJson());
imprimirNodos();
//readTextFile();

//imprimirStack( dfs("A","H"));

//imprimirStack( dlimiteds("A","H",10));
imprimirCostoUni(costoUniforme("A","H"));



/*
/*function insertarNodoCerrados(lista){
  var pos = cerrados.length;
  cerrados[pos] = lista;
}

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
*/
 function astar(nodoInicial,nodoFinal){
  var cerrados = new Array();
  var abiertos = new Array();
  var listaActual = new Array();
  listaActual=nodoInicial;
  while(listaActual[listaActual.length-1]!=nodoFinal.nombre){
    if (cerrados.length==0){
      var posi = cerrados.length;
      cerrados[posi] = nodoInicial;
    }
    else{
      listaActual = cerrados[cerrados.length-1];
      //document.write(listaActual);
      var pos = abiertos.length;

      var arcDestino = buscarH(listaActual);

     // document.write(buscarH(listaActual));

      var sumatoria = ((listaActual.costo)+(arcDestino.costo)+(arcDestino.euristica)-(arcDestino.origen.euristica));
      listaActual = listaActual + arcDestino.nombre;
      abiertos[pos] = (listaActual + sumatoria) ;
      abiertos[sumatoria].sort();
      cerrados[cerrados.length-1] = abiertos[0];
      abiertos[0].remove();
      document.write(nodoInicial); 
    }
  }
  
}   

function buscarH (listaActual){
  var ultNodoLista;
  ultNodoLista = listaActual[listaActual.length-1];
  for (i = 0; i < arcos.length; i++){
    if(arcos[i].origen==ultNodoLista){
      return arcos[i].destino;

      document.write(arcos.origen);
    }
  }
}

/*
function costo(nodoInicial, nodoFinal){
  var cerrados = new Array();
  var abiertos = new Array();
  var listaActual = new Array();
  while(listaActual[listaActual.length-1]!=nodoFinal.nombre){
    if (cerrados.length==null){
      var posi = cerrados.length;
      cerrados[posi] = nodoInicial;
    }
    else{
      listaActual = cerrados[cerrados.length-1];
      var pos = abiertos.length;

      var arcDestino = buscarH(listaActual);
      var sumatoria = ((listaActual.costo)+(arcDestino.costo));
      listaActual = listaActual + arcDestino.nombre;
      abiertos[pos] = (listaActual + sumatoria) ;
      abiertos[sumatoria].sort();
      cerrados[cerrados.length-1] = abiertos[0];
      abiertos[0].remove();
      document.write("veame"); 
    }
  }
  
}  */
bfs("A","H");
function bfs(nodoInicial,nodoFinal){

  var cerrados = new Array();
  var abiertos = new Array();
  var listaActual = new Array();
  listaActual = nodoInicial;
  while(listaActual[listaActual.length-1]!=nodoFinal.nombre){
    if (cerrados.length==0){
      var posi = cerrados.length;
      cerrados[posi] = nodoInicial;
    }
    else{
      listaActual = cerrados[cerrados.length-1];
      var pos = abiertos.length;
      var arcDestino = buscarH(listaActual);
      abiertos[pos] = arcDestino;

      abiertos.sort(compare);

      cerrados[cerrados.length-1] = abiertos[0];
      abiertos[0].remove();
      document.write(abiertos);
      document.write(cerrados);
      document.write("hola");
    }
  }
  
}   

function buscarH (listaActual){
  
  for (var i = 0 ; i < nodos.length ; i++){
    if(nodos.arcos[i].origen==listaActual){
      return nodos[i];
    }
  }
  return null;
}