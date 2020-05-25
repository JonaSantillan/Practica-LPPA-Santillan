window.onload = function() {
    var form = document.getElementById("Formulario")
    form.onsubmit = function(evt){
        evt.preventDefault()
        var nombre = form.elements['nombre'].value
        var apellido = form.elements['apellido'].value
        var edad = form.elements['edad'].value
        var mail = form.elements['mail'].value
        var genero = form.elements['genero'].value
        var pais = form.elements['browsers'].value
        var comentario = form.elements['mensaje'].value
        var interes = new Array();
        document.querySelectorAll('input[name="interes"]').forEach(function(seleccionado) {
            if (seleccionado.checked) {
                interes.push(seleccionado.value);
            }
        })
        console.log(nombre);
        console.log(apellido);
        console.log(edad);
        console.log(mail);
        console.log(genero);
        console.log(interes);
        console.log(pais);
        console.log(comentario); 
    }
}
