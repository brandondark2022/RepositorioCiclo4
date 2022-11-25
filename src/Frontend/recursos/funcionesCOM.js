//interruptor de javascript para activar los botones
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }else{
        registrarUsuario()
        event.preventDefault()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

function registrarUsuario(){
    let cedula = document.querySelector("#txtDocumento").value;
    let nombre = document.querySelector("#txtNombre").value;
    let apellido = document.querySelector("#txtApellido").value;
    let telefono = document.querySelector("#txtTelefono").value;
    let correo = document.querySelector("#txtCorreo").value;
    //let contrasena = document.querySelector("#txtContrasena").value;
    let rol = document.querySelector("#txtRol").value;

    let url = `http://localhost:3000/usuarios`;
    let datos={
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      correo: correo,
      //contrasena: contrasena,
      rol: rol
    };

    fetch(url,{
      method: "POST",
      body: JSON.stringify(datos),
      headers:{
        'content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(mensaje => {
        console.log(mensaje)
    })

}
