$.getScript("Main.js", function(data, textStatus, jqxhr) {
  console.log(data); //data returned
  console.log(textStatus); //success
  console.log(jqxhr.status); //200
  console.log('Load was performed.');
});
no


function insertarNodoAbiertos(nodoInicial,nodoFinal){
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
      var sumatoria = ((listaActual.distancia)+(arcDestino.distancia)+(arcDestino.euristica) -(arcDestino.origen.euristica));
      listaActual = listaActual + arcDestino.nombre;
      abiertos[pos] = (listaActual + sumatoria) ;
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
 