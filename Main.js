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