var cantNodos = 25;
var nodes = null;
var edges = null;
var network = null;
var heuristic = null;
// randomly create some nodes and edges
var data = getScaleFreeNetwork(cantNodos);
var seed = 2;



var nodos = new Array();

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

// function importarJSON(evt, ESTRUCTURA) {
//     var files = evt.target.files; // FileList object

//     // files is a FileList of File objects. List some properties.
//     var output = [];
//     for (var i = 0, f; f = files[i]; i++) {
//       output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                   f.size, ' bytes, last modified: ',
//                   f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
//                   '</li>');
//     }
//     document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
//   }

//   document.getElementById('files').addEventListener('change', handleFileSelect, false);

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
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