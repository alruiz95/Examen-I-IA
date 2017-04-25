function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}


function getScaleFreeNetwork(nodeCount) {
  var nodes = [];
  var edges = [];
  var connectionCount = [];
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWYXZ";

  // randomly create some nodes and edges
  for (var i = 0; i < nodeCount; i++) {
    if(i < 26){
    nodes.push({
      id: alphabet[i],
      label: alphabet[i],
      title: "null",   //INICIAL FINAL
      value: 0         //VISITADO   0:no | 1:si
    });}//if

    else if(i >= 26){
      var temp = i;
      var tempId = "";
      while(temp > 25){
        tempId = tempId + alphabet[0];
        temp = temp - 26;
        }//while
      tempId = tempId + alphabet[temp];//lo que faltaba
      nodes.push({
        id: tempId,
        label: tempId,
        title: "null",  //INICIAL FINAL
        value: 0        //Visitado   0:no | 1:si  
      });
    }//else if

    connectionCount[i] = 0;

    // create edges in a scale-free-network way
    if (i == 1) {
      var from = "B";
      var to = "A";
      var costo = String(Math.floor(Math.random() * nodeCount) + 1);
      var id = String(from) + String(to);
      edges.push({
        id: id,
        from: from,
        to: to,
        label: costo //Costo
      });
      connectionCount[1]++;
      connectionCount[0]++;
    }
    else if (i > 1){
      var conn = edges.length * 2;
      var rand = Math.floor(Math.random() * conn);
      var cum = 0;
      var j = 0;
      while (j < connectionCount.length && cum < rand) {
        cum += connectionCount[j];
        j++;
      }//while

      var temp = i;
      var tempFrom = "";
      while(temp > 25){
        tempFrom = tempFrom + alphabet[0];
        temp = temp - 26;
        }//while

      tempFrom = tempFrom + alphabet[temp];//lo que faltaba
      var temp2 = j;
      var tempTo = "";
      while(temp2 > 25){
        tempTo = tempTo + alphabet[0];
        temp2 = temp2 - 26;
        }//while
      tempTo = tempTo + alphabet[temp2];//lo que faltaba

      var costo = String(Math.floor(Math.random() * nodeCount) + 1);
      var id = String(tempFrom) + String(tempTo);
      edges.push({
        id: id,
        from: tempFrom,
        to: tempTo,
        label: costo     //Costo
      });
      connectionCount[i]++;
      connectionCount[j]++;
    }//else if
  }//for

  return {nodes:nodes, edges:edges};

}

var randomSeed = 764; // Math.round(Math.random()*1000);
function seededRandom() {
  var x = Math.sin(randomSeed++) * 10000;
  return x - Math.floor(x);
}

function getScaleFreeNetworkSeeded(nodeCount, seed) {
  if (seed) {
    randomSeed = Number(seed);
  }
  var nodes = [];
  var edges = [];
  var connectionCount = [];
  var edgesId = 0;


  // randomly create some nodes and edges
  for (var i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      label: String(i)
    });

    connectionCount[i] = 0;

    // create edges in a scale-free-network way
    if (i == 1) {
      var from = i;
      var to = 0;
      edges.push({
        id: edgesId++,
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
    else if (i > 1) {
      var conn = edges.length * 2;
      var rand = Math.floor(seededRandom() * conn);
      var cum = 0;
      var j = 0;
      while (j < connectionCount.length && cum < rand) {
        cum += connectionCount[j];
        j++;
      }


      var from = i;
      var to = j;
      edges.push({
        id: edgesId++,
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
  }

  return {nodes:nodes, edges:edges};
}