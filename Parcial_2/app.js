window.onload = async function() {
    try{
        if(localStorage.getItem("tabla") === null){
            var cargando = document.getElementById("cargando")
            cargando.textContent = "Cargando..."
        }else{
            var cargando = document.getElementById("cargando")
            cargando.textContent = "Actualizando..."
        }

        var response = await fetch ("http://dummy.restapiexample.com/api/v1/employees")
        var jsonResponse = await response.json()
        
        localStorage.setItem("tabla", JSON.stringify(jsonResponse))

        CargaStorage(jsonResponse)
      
        cargando.style.display = "none"

    }
    catch(error){
        var cargando = document.getElementById("cargando")
        cargando.textContent = "Error de Conexión!!!"
       
        var cargaconerror = JSON.parse(localStorage.getItem("tabla"))

        CargaStorage(cargaconerror)
    }
}

var CargaStorage = function(jsonResponse){

    var id = document.getElementById("id")
    var nombre = document.getElementById("nombre")
    var salario = document.getElementById("salario")
    var edad = document.getElementById("edad")
    jsonResponse.data.forEach(function(empleado){

        var li = document.createElement("li")
        li.appendChild(document.createTextNode(empleado.id))
        id.appendChild(li)

        var li = document.createElement("li")
        li.appendChild(document.createTextNode(empleado.employee_name))
        nombre.appendChild(li)

        var li = document.createElement("li")
        li.appendChild(document.createTextNode(empleado.employee_salary))
        salario.appendChild(li)

        var li = document.createElement("li")
        li.appendChild(document.createTextNode(empleado.employee_age))
        edad.appendChild(li)       
        
    })

}




