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
       var cambio1 = document.getElementById("Jugador1")
       var cambio2 = document.getElementById("Jugador2")
       celda.onclick = (function(){
           if(estado_tablero[y][x] === 0){
                estado_tablero[y][x] = turno
                turno = turno === 1 ? 2 : 1
                pintar()
                if(turno === 1){
                    cambio1.className = "activo1"
                    cambio2.className = "activo"
                }
                if(turno === 2){
                    cambio1.className = "activo"
                    cambio2.className = "activo2"
                }
            }
       })
     })
   })
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

