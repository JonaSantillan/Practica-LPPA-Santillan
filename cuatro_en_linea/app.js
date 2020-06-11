var estado_tablero = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ]
  
  var turno = 1
  
  window.onload = function() {
    estado_tablero.forEach(function(fila, y) {
      fila.forEach(function(valor, x) {
        var celda = document.getElementById(x + '-' + y)
        celda.onclick = (function(){
            estado_tablero[y][x] = turno
            turno = turno === 1 ? 2 : 1
            pintar()
        })
      })
    })
    pintar()
  }
  
  var pintar = function() {
    estado_tablero.forEach(function(fila, y) {
        fila.forEach(function(valor, x) {
          var celda = document.getElementById(x + '-' + y)
          if (valor === 1){
              celda.className = "celdaJ1"
          }else if (valor === 2){
              celda.className = "celdaJ2"
          }       
        })
    })
  }