var cantNodos = 25;
var nodes = null;
var edges = null;
var network = null;
var heuristic = null;
// randomly create some nodes and edges
var data = getScaleFreeNetwork(cantNodos);
var seed = 2;



var nodos = new Array();
var listaCerrados = new Array();
var listaAbiertos = new Array();

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

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

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function insertarNodo(nombre){
  if (buscar(nombre) != null){
    alert("No se puede insertar el nodo: '"+nombre+"'' por que ya existe");
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

  var na;
  na = new Arco(peso,nodoDestino);
  var pos = nodoOrigen.arcos.length;
  nodoOrigen.arcos[pos] = na;
  return true;
}

function imprimirNodos(){
  console.log("Imprimir:");
  var i;
  for (i = 0; i < nodos.length; i++){
    console.log("====== "+nodos[i].nombre+" ======");
    for (var x = 0; x < nodos[i].arcos.length; x++){
      console.log("--> "+nodos[i].arcos[x].destino.nombre+" --->Costo: "+nodos[i].arcos[x].costo);
    }
  }
}

function imprimirStack(stack, ESTRUCTURA){
 var struct = document.getElementById(ESTRUCTURA);
 var result = "";

  if (stack==null){
    return;
  }
  stack.reverse();
  while(stack.length>0){
    result = result + (stack.pop().nombre+",");
  }
  struct.value = result;
}

function exportarJSON(ESTRUCTURA){
  var blob = new Blob([JSON.stringify(data)], {type: "application/json"});
  var url  = URL.createObjectURL(blob);
  var a = document.getElementById(ESTRUCTURA);
  a.download    = "backup.json";
  a.href        = url;
}

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function mergeData(){
  nodos = new Array(); 
  var tempNodos = data.nodes;
  var tempArcos = data.edges; 

  for(var i = 0; i < tempNodos.length; i++){
      insertarNodo(tempNodos[i].id);     
  }//for i

  for(var j = 0; j < tempArcos.length; j++){
      insertarArco(tempArcos[j].label, tempArcos[j].from, tempArcos[j].to);
      insertarArco(tempArcos[j].label, tempArcos[j].to, tempArcos[j].from);
   }//for j
}

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function loadDoc(RUTA) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("body-menu").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", RUTA, true);
  xhttp.send();
}

function reload() {
    location.reload();
}

function modificarCantNodos(VALOR){
  data = getScaleFreeNetwork(VALOR);
  init();
}

function modificarNodoInicial(VALOR){
  var lista = data.nodes;
  var e = document.getElementById('listaNodosIniciales');
  var NODO = e.options[e.selectedIndex].value;

  for(var i = 0; i < lista.length; i++){
      if(lista[i].id == NODO){
        lista[i].title = VALOR;
        //llenarNodosIniciales("listaNodosIniciales");
        break;
      }
  }
}

function modificarNodoFinal(VALOR){
  var lista = data.nodes;
  var e = document.getElementById('listaNodosFinales');
  var NODO = e.options[e.selectedIndex].value;

  for(var i = 0; i < lista.length; i++){
      if(lista[i].id == NODO){
        lista[i].title = VALOR;
        //llenarNodosFinales("listaNodosFinales");
        break;
      }
  }
}

function llenarNodosIniciales(ESTRUCTURA){
  var combo = document.getElementById(ESTRUCTURA); 
  var lista = data.nodes;

   for(var i = combo.options.length - 1 ; i >= 0 ; i--)
    {
        combo.remove(i);
    }

  for(var i = 0; i < lista.length; i++) {
      if(lista[i].title == "null"){
        var opt = lista[i].id;
        var el = document.createElement("OPTION");
        el.textContent = opt;
        el.value = opt;
        combo.appendChild(el);
      }
  }
}

function llenarNodosFinales(ESTRUCTURA){
  var combo = document.getElementById(ESTRUCTURA); 
  var lista = data.nodes;

   for(var i = combo.options.length - 1 ; i >= 0 ; i--)
    {
        combo.remove(i);
    }

  for(var i = 0; i < lista.length; i++) {
      if(lista[i].title == "null"){
        var opt = lista[i].id;
        var el = document.createElement("OPTION");
        el.textContent = opt;
        el.value = opt;
        combo.appendChild(el);
      }
  }
}

function readBlob(opt_startByte, opt_stopByte) {

    var files = document.getElementById('files').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        document.getElementById('byte_content').textContent = evt.target.result;
        document.getElementById('byte_range').textContent = 
            ['Read bytes: ', start + 1, ' - ', stop + 1,
             ' of ', file.size, ' byte file'].join('');
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  }
  
  // document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
  //   if (evt.target.tagName.toLowerCase() == 'button') {
  //     var startByte = evt.target.getAttribute('data-startbyte');
  //     var endByte = evt.target.getAttribute('data-endbyte');
  //     readBlob(startByte, endByte);
  //   }
  // }, false);

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

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

function costoUniforme(rais, goal){
  listaCerrados = new Array();
  listaAbiertos = new Array();

  var nodoIni = buscar(rais);
  insertarCerrados(nodoIni);

  var listaAnterior = new Array();
  listaAnterior[0] = nodoIni;

  while(true){

    if (listaCerrados.length > nodos.length){
      console.log("No se pudo encontrar");
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
    //imprimirCerrados();
    //imprimirAbiertos();
    var ultA = ultimoListaAbiertos();

    for (var i = 0; i<listaAbiertos.length; i++){
      var count = listaAbiertos[i].length;
      var comp = listaAbiertos[i][count-1];
      if (exiteEnCerrados(comp)){
        listaAbiertos.splice(i,1);
      }
    }
    
    while (exiteEnCerrados(ultA.nombre)){
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

function imprimirCostoUni(LISTA, ESTRUCTURA){
  var struct = document.getElementById(ESTRUCTURA);
  var result = "";

  if (LISTA==null){
    return;
  }
  for (var i = 0; i < LISTA.length; i++) {
    result = result + (LISTA[i].nombre + ",");
  }
  struct.value = result;
}

function ucsAUX(ORIGEN, DESTINO, ESTRUCTURA){
  var origen = document.getElementById(ORIGEN);
  var nOrigen = origen.options[origen.selectedIndex].value;

  var destino = document.getElementById(DESTINO);
  var nDestino = destino.options[destino.selectedIndex].value;

   imprimirCostoUni(costoUniforme(nOrigen, nDestino), ESTRUCTURA);
} 



function dlimitedsAUX(ORIGEN, DESTINO, ESTRUCTURA){
  var origen = document.getElementById(ORIGEN);
  var nOrigen = origen.options[origen.selectedIndex].value;

  var destino = document.getElementById(DESTINO);
  var nDestino = destino.options[destino.selectedIndex].value;

  imprimirStack(dlimiteds(nOrigen, nDestino, data.nodes.length), ESTRUCTURA);
} 



function dlimiteds( rais, goal, limitacion){
  var node;
  var to;
  var stack = [];
  var Nroot = buscar(rais);
  var NodoM = buscar(goal);
  if (Nroot == null || NodoM == null){
    console.log("Error1");
    return;
  }

  Nroot.visitado=true;
  stack.push(Nroot);

  while (true) {
    
    var node = stack.pop();

    if (node == null){
      console.log("No se pudo encontrar");
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

function dfsAUX(ORIGEN, DESTINO, ESTRUCTURA){
  var origen = document.getElementById(ORIGEN);
  var nOrigen = origen.options[origen.selectedIndex].value;

  var destino = document.getElementById(DESTINO);
  var nDestino = destino.options[destino.selectedIndex].value;

  imprimirStack(dfs(nOrigen, nDestino), ESTRUCTURA);
} 

function dfs(rais, goal){
  var node;
  var to;
  var stack = [];
  var Nroot = buscar(rais);
  var NodoM = buscar(goal);
  if (Nroot == null || NodoM == null){
    console.log("Error1");
    return;
  }
  Nroot.visitado=true;
  stack.push(Nroot);
  while (true) {
    
    var node = stack.pop();
    stack.push(node);
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

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    
    function destroy() {
      if (network !== null) {
        network.destroy();
        network = null;
      }
    }

    function draw() {
      destroy();
      nodes = [];
      edges = [];
      heuristic = [];

      // create a network
      var container = document.getElementById('mynetwork');
      var options = {
        layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
        // locale: document.getElementById('locale').value,
        locale: "es",
        manipulation: {
          addNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('node-operation').innerHTML = "Add Node";
            editNode(data, callback);
          },
          editNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('node-operation').innerHTML = "Edit Node";
            editNode(data, callback);
          },
          addEdge: function (data, callback) {
            if (data.from == data.to) {
              var r = confirm("Do you want to connect the node to itself?");
              if (r != true) {
                callback(null);
                return;
              }
            }
            document.getElementById('edge-operation').innerHTML = "Add Edge";
            editEdgeWithoutDrag(data, callback);
          },
          editEdge: {
            editWithoutDrag: function(data, callback) {
              document.getElementById('edge-operation').innerHTML = "Edit Edge";
              editEdgeWithoutDrag(data,callback);
            }
          }
        }
      };
      network = new vis.Network(container, data, options);
      
    }

    function editNode(data, callback) {
      document.getElementById('node-label').value = data.label;
      document.getElementById('node-saveButton').onclick = saveNodeData.bind(this, data, callback);
      document.getElementById('node-cancelButton').onclick = clearNodePopUp.bind();
      document.getElementById('node-popUp').style.display = 'block';
    }

    function clearNodePopUp() {
      document.getElementById('node-saveButton').onclick = null;
      document.getElementById('node-cancelButton').onclick = null;
      document.getElementById('node-popUp').style.display = 'none';
    }

    function cancelNodeEdit(callback) {
      clearNodePopUp();
      callback(null);
    }

    function saveNodeData(data, callback) {
      data.label = document.getElementById('node-label').value;
      clearNodePopUp();
      callback(data);
    }

    function editEdgeWithoutDrag(data, callback) {
      // filling in the popup DOM elements
      document.getElementById('edge-label').value = data.label;
      document.getElementById('edge-saveButton').onclick = saveEdgeData.bind(this, data, callback);
      document.getElementById('edge-cancelButton').onclick = cancelEdgeEdit.bind(this,callback);
      document.getElementById('edge-popUp').style.display = 'block';
    }

    function clearEdgePopUp() {
      document.getElementById('edge-saveButton').onclick = null;
      document.getElementById('edge-cancelButton').onclick = null;
      document.getElementById('edge-popUp').style.display = 'none';
    }

    function cancelEdgeEdit(callback) {
      clearEdgePopUp();
      callback(null);
    }

    function saveEdgeData(data, callback) {
      if (typeof data.to === 'object')
        data.to = data.to.id
      if (typeof data.from === 'object')
        data.from = data.from.id
      data.label = document.getElementById('edge-label').value;
      clearEdgePopUp();
      callback(data);
    }

    function clearPopUp() {
      document.getElementById('saveButton').onclick = null;
      document.getElementById('cancelButton').onclick = null;
      document.getElementById('network-popUp').style.display = 'none';
    }

    function cancelEdit(callback) {
      clearPopUp();
      callback(null);
    }

    function saveData(data,callback) {
      data.id = document.getElementById('node-id').value;
      data.label = document.getElementById('node-label').value;
      clearPopUp();
      callback(data);
    }

    function init() {
      //setDefaultLocale();
      mergeData();
      draw();
    }
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/