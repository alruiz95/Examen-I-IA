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
      var sumatoria = ((listaActual.distancia)+(arcDestino.distancia)+(arcDestino.euristica) -(arcDestino.origen.euristica));
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
 