
var estado_tablero = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ]

var estado_inicial = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ]

var turno = 1

window.onload = function() {
 //colocar para que reestablezca el tablero al refrescar
  if(localStorage.getItem("estado") !== null){
    estado_tablero = JSON.parse(localStorage.getItem("estado"))
    pintar()
  }
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
            Detenerse2()
            TiempoJug1()
          }
          if(turno === -1){
            cambiar()
            cambio1.className = "activo2"
            Detenerse1()
            TiempoJug2()
          }
        localStorage.setItem("estado", JSON.stringify(estado_tablero))
      })
      celda.onmouseover = mousearriba(x)
      celda.onmouseout = mousenoarriba(x)
    })
  })
  TiempoJug1()
  reset()
  Guardar()
}

//Contador de Tiempo

var TiempoJug1 = function(){
  var n = 0
  var l1 = document.getElementById("SegJ1") 
  n = l1.innerHTML

  tiempo1 = window.setInterval(function(){
    l1.innerHTML = n
    n++
  },1000)
}

var TiempoJug2 = function(){
  var n = 0
  var l2 = document.getElementById("SegJ2")
  n = l2.innerHTML

  tiempo2 = window.setInterval(function(){
    l2.innerHTML = n
    n++
  },1000)
}

var Detenerse1 = function(){
  clearInterval(tiempo1)
}

var Detenerse2 = function(){
  clearInterval(tiempo2)
}

//fin contador de tiempos

//Indicadores
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

//Fin indicadores

//Operaciones 

var chequearGanador = function(){
  var cero = false
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 7; x++) {
      try{
        if(estado_tablero[y][x] === 0){
          cero = true
        }

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
            alert("Ganador: Jugador " + jugadorverde)
            ResetManual()
          }
          if(turno === -1){
            alert("Ganador: Jugador  " + jugadorrojo)
            ResetManual()
          }
        }
      }
      catch(error){
        //vacio
      }
    }
  } 
  if(!cero){
    alert("Hubo un empate")
    ResetManual()
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

var despintar = function() {
  estado_tablero.forEach(function(fila, y) {
    fila.forEach(function(valor, x) {
      var celda = document.getElementById(x + '-' + y)
      if (valor === 1){
          celda.className = "celda"
      }else if (valor === -1){
          celda.className = "celda"
      }
    })
  })
}

var ResetManual = function(){
  var estado_reset = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ]
  despintar()
  localStorage.removeItem("estado")
  JSON.stringify(localStorage.setItem("estado", estado_reset))
  estado_tablero = estado_reset
  var time1 = document.getElementById("SegJ1")
  var time2 = document.getElementById("SegJ2")
  Detenerse1()
  Detenerse2()
  time1.innerHTML = 0
  time2.innerHTML = 0
}

var reset = function(){
  var reset = document.getElementById("reset")
  reset.onclick = function(){  
    var estado_reset = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ]
    despintar()
    localStorage.removeItem("estado")
    JSON.stringify(localStorage.setItem("estado", estado_reset))
    estado_tablero = estado_reset
    
    var time1 = document.getElementById("SegJ1")
    var time2 = document.getElementById("SegJ2")
    Detenerse1()
    Detenerse2()
    time1.innerHTML = 0
    time2.innerHTML = 0
  }
}

//Guarda Partida en Tabla

/*La Partida guarda lo siguiente:
- id de partida
- fecha
- tiempo j1
- tiempo j2
- seleccionar 


id="idpartida"
id="fechapartida"
id="timeJ1"
id="timeJ2"
id="select"
*/

var ListaPartida = []

var idp = document.getElementById("idpartida")
var fechap = document.getElementById("fechapartida")
var tJ1 = document.getElementById("timeJ1")
var tJ2 = document.getElementById("timeJ2")
var select = document.getElementById("select")
var estate

//esta funcion debe agregar una partida
var AgregarPartida = function (idp, fechap, tJ1, tJ2, select, estate){
//ver id de como ponerlo....
  if(idp){
    idp = idp + 1
  }

  var time1 = document.getElementById("SegJ1")
  var time2 = document.getElementById("SegJ2")

  fechap = new Date()

  tJ1 = time1.innerHTML
  tJ2 = time2.innerHTML
  estate = JSON.parse(localStorage.getItem("estado"))


  var newPartida = {
    id : idp,
    Fecha : fechap,
    tiempoj1 : tJ1,
    tiempoj2 : tJ2,
    Selector : select,
    estadoG : estate
  }



  ListaPartida.push(newPartida)

}

var Guardar = function(){
  var guardar = document.getElementById("guardar")
  guardar.onclick = function(){
    AgregarPartida()
    localStorage.setItem("Partida", JSON.stringify(ListaPartida)) //estoy guardando lo que ya tenia guardado
    ArmarTabla(ListaPartida)
  }
}

var ArmarTabla = function(ListaPartida){
  var idp = document.getElementById("idpartida")
  var fechap = document.getElementById("fechapartida")
  var tJ1 = document.getElementById("timeJ1")
  var tJ2 = document.getElementById("timeJ2")
  var select = document.getElementById("select")

  ListaPartida.forEach(function(partida){
    var li = document.createElement("li")
    li.appendChild(document.createTextNode(partida.id))
    idp.appendChild(li)
    console.log(idp)

    var li = document.createElement("li")
    li.appendChild(document.createTextNode(partida.Fecha))
    fechap.appendChild(li)

    var li = document.createElement("li")
    li.appendChild(document.createTextNode(partida.tiempoj1))
    tJ1.appendChild(li)

    var li = document.createElement("li")
    li.appendChild(document.createTextNode(partida.tiempoj2))
    tJ2.appendChild(li)


  })
}

//Fin Operaciones
