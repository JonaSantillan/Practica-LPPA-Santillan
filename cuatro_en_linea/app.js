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
       var cambio1 = document.getElementById("Jugador")
       celda.onclick = (function(){
           for (let y = 0; y < 6; y++) {
             const valor = estado_tablero[y][x];
             if(valor !== 0){
               estado_tablero[y - 1][x] = turno
               turno = turno === 1 ? -1 : 1
               break
             }else if (y === 5){
              estado_tablero[y][x] = turno
              turno = turno === 1 ? -1 : 1
             }
           }
          pintar()
          chequearGanador()
          if(turno === 1){
              cambiar()
              cambio1.className = "activo1"
          }
          if(turno === -1){
              cambiar()
              cambio1.className = "activo2"
          }

        })
        celda.onmouseover = mousearriba(x)
        celda.onmouseout = mousenoarriba(x)

     })
   })
}

var reset = function(){
  var mensaje = confirm("¿Jugamos otra partida?")
  if(mensaje){
    alert("Juguemos otra vez!")
    location.reload()
  }else{
    alert("Nos vemos otro día!")
    window.close()
  }



}


var chequearGanador = function(){
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 7; x++) {
      try{
        var celdax1 = estado_tablero[y][x]
        var celdax2 = estado_tablero[y][x + 1]
        var celdax3 = estado_tablero[y][x + 2]
        var celdax4 = estado_tablero[y][x + 3]

        var celday1 = estado_tablero[y][x]
        var celday2 = estado_tablero[(y + 1)] && estado_tablero[(y + 1)][x]
        var celday3 = estado_tablero[(y + 2)] && estado_tablero[(y + 2)][x]
        var celday4 = estado_tablero[(y + 3)] && estado_tablero[(y + 3)][x]

        var resultadox = (celdax1 + celdax2 + celdax3 + celdax4)
        var resultadoy = (celday1 + celday2 + celday3 + celday4)

        if(Math.abs(resultadox) === 4 || Math.abs(resultadoy) === 4){
          var jugadorverde = 2
          var jugadorrojo = 1
          if(turno === 1){
            alert("Ganador: Jugador  " + jugadorverde)
            reset()
          }
          if(turno === -1){
            alert("Ganador: Jugador  " + jugadorrojo)
            reset()
          }
        }
      }
      catch(error){
        //vacio
      }
  }
}
}

var mousearriba = function (x){
  return function(){
    var triang = document.getElementById("trian_" + x)
    triang.style.borderTop = "30px solid #ffee00"
  }
}

var mousenoarriba = function (x){
  return function(){
    var triang = document.getElementById("trian_" + x)
    triang.style.borderTop = "30px solid transparent"
  }
}

function cambiar() {
  var jugadorturno = 2
  if(turno === 1){
    document.getElementById("Jugador").innerHTML= "JUGADOR " + turno ;
  }
  if(turno === -1){
    document.getElementById("Jugador").innerHTML= "JUGADOR " + jugadorturno;
  }

}


var pintar = function() {
  estado_tablero.forEach(function(fila, y) {
      fila.forEach(function(valor, x) {
        var celda = document.getElementById(x + '-' + y)
        if (valor === 1){
            celda.className = "celdaJ1"
        }else if (valor === -1){
            celda.className = "celdaJ2"
        }
      })
  })
}
