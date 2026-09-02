// =====================================================
// SISTEMA DE FICHA MÉDICA
// =====================================================


// =====================================================
// ELEMENTOS DEL FORMULARIO
// =====================================================

const formulario =
    document.getElementById("formPaciente");

const rut =
    document.getElementById("rut");

const nombres =
    document.getElementById("nombres");

const apellidos =
    document.getElementById("apellidos");

const direccion =
    document.getElementById("direccion");

const ciudad =
    document.getElementById("ciudad");

const telefono =
    document.getElementById("telefono");

const email =
    document.getElementById("email");

const fechaNacimiento =
    document.getElementById("fechaNacimiento");

const estadoCivil =
    document.getElementById("estadoCivil");

const comentarios =
    document.getElementById("comentarios");

const mensaje =
    document.getElementById("mensaje");

const tablaPacientes =
    document.getElementById("tablaPacientes");


// =====================================================
// BOTONES
// =====================================================

const btnLimpiar =
    document.getElementById("btnLimpiar");

const btnCerrar =
    document.getElementById("btnCerrar");

const btnBuscar =
    document.getElementById("btnBuscar");

const btnMostrarTodos =
    document.getElementById("btnMostrarTodos");

const buscarApellido =
    document.getElementById("buscarApellido");


// =====================================================
// OBTENER REGISTROS GUARDADOS
// =====================================================

let pacientes =
    JSON.parse(
        localStorage.getItem("pacientes")
    ) || [];


// =====================================================
// VALIDAR RUT CHILENO
// =====================================================

function validarRut(rutCompleto) {

    rutCompleto =
        rutCompleto
            .replace(/\./g, "")
            .replace("-", "")
            .toUpperCase();

    if (rutCompleto.length < 8) {
        return false;
    }

    const cuerpo =
        rutCompleto.slice(0, -1);

    const dv =
        rutCompleto.slice(-1);

    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    let suma = 0;
    let multiplo = 2;

    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            parseInt(cuerpo.charAt(i))
            * multiplo;

        multiplo =
            multiplo < 7
                ? multiplo + 1
                : 2;
    }

    const resultado =
        11 - (suma % 11);

    let dvEsperado;

    if (resultado === 11) {
        dvEsperado = "0";
    }
    else if (resultado === 10) {
        dvEsperado = "K";
    }
    else {
        dvEsperado =
            resultado.toString();
    }

    return dv === dvEsperado;
}


// =====================================================
// VALIDAR NOMBRE / APELLIDO / CIUDAD
// =====================================================

function validarTexto(texto) {

    const patron =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

    return patron.test(texto);
}


// =====================================================
// VALIDAR TELÉFONO
// =====================================================

function validarTelefono(numero) {

    const patron =
        /^9\d{8}$/;

    return patron.test(numero);
}


// =====================================================
// VALIDAR EMAIL
// =====================================================

function validarEmail(correo) {

    const patron =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patron.test(correo);
}


// =====================================================
// VALIDAR FECHA
// =====================================================

function validarFecha(fecha) {

    if (!fecha) {
        return false;
    }

    const fechaSeleccionada =
        new Date(fecha);

    const hoy =
        new Date();

    return fechaSeleccionada <= hoy;
}


// =====================================================
// MOSTRAR MENSAJE
// =====================================================

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = tipo;

}


// =====================================================
// GUARDAR REGISTRO
// =====================================================

formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();

        // -------------------------------
        // Validar RUT
        // -------------------------------

        if (!validarRut(rut.value)) {

            mostrarMensaje(
                "El RUT ingresado no es válido.",
                "error"
            );

            rut.focus();

            return;
        }


        // -------------------------------
        // Validar nombres
        // -------------------------------

        if (
            nombres.value.trim().length < 2 ||
            !validarTexto(nombres.value.trim())
        ) {

            mostrarMensaje(
                "Ingrese nombres válidos.",
                "error"
            );

            nombres.focus();

            return;
        }


        // -------------------------------
        // Validar apellidos
        // -------------------------------

        if (
            apellidos.value.trim().length < 2 ||
            !validarTexto(apellidos.value.trim())
        ) {

            mostrarMensaje(
                "Ingrese apellidos válidos.",
                "error"
            );

            apellidos.focus();

            return;
        }


        // -------------------------------
        // Dirección
        // -------------------------------

        if (
            direccion.value.trim().length < 5
        ) {

            mostrarMensaje(
                "Ingrese una dirección válida.",
                "error"
            );

            direccion.focus();

            return;
        }


        // -------------------------------
        // Ciudad
        // -------------------------------

        if (
            ciudad.value.trim().length < 2 ||
            !validarTexto(ciudad.value.trim())
        ) {

            mostrarMensaje(
                "Ingrese una ciudad válida.",
                "error"
            );

            ciudad.focus();

            return;
        }


        // -------------------------------
        // Teléfono
        // -------------------------------

        if (
            !validarTelefono(
                telefono.value.trim()
            )
        ) {

            mostrarMensaje(
                "El teléfono debe comenzar con 9 y contener 9 dígitos.",
                "error"
            );

            telefono.focus();

            return;
        }


        // -------------------------------
        // Email
        // -------------------------------

        if (
            !validarEmail(
                email.value.trim()
            )
        ) {

            mostrarMensaje(
                "Ingrese un email válido.",
                "error"
            );

            email.focus();

            return;
        }


        // -------------------------------
        // Fecha nacimiento
        // -------------------------------

        if (
            !validarFecha(
                fechaNacimiento.value
            )
        ) {

            mostrarMensaje(
                "La fecha de nacimiento no puede ser futura.",
                "error"
            );

            fechaNacimiento.focus();

            return;
        }


        // -------------------------------
        // Estado civil
        // -------------------------------

        if (
            estadoCivil.value === ""
        ) {

            mostrarMensaje(
                "Seleccione un estado civil.",
                "error"
            );

            estadoCivil.focus();

            return;
        }


        // =====================================================
        // CREAR OBJETO PACIENTE
        // =====================================================

        const paciente = {

            rut:
                rut.value.trim(),

            nombres:
                nombres.value.trim(),

            apellidos:
                apellidos.value.trim(),

            direccion:
                direccion.value.trim(),

            ciudad:
                ciudad.value.trim(),

            telefono:
                telefono.value.trim(),

            email:
                email.value.trim(),

            fechaNacimiento:
                fechaNacimiento.value,

            estadoCivil:
                estadoCivil.value,

            comentarios:
                comentarios.value.trim()

        };


        // =====================================================
        // VERIFICAR SI EL RUT YA EXISTE
        // =====================================================

        const indiceExistente =
            pacientes.findIndex(
                p =>
                    limpiarRut(p.rut)
                    ===
                    limpiarRut(paciente.rut)
            );


        if (indiceExistente !== -1) {

            const sobrescribir =
                confirm(
                    "El paciente ya existe.\n\n" +
                    "¿Desea sobrescribir el registro?"
                );


            if (sobrescribir) {

                pacientes[indiceExistente] =
                    paciente;

                mostrarMensaje(
                    "Registro actualizado correctamente.",
                    "exito"
                );

            }
            else {

                mostrarMensaje(
                    "No se realizaron cambios.",
                    "error"
                );

                return;
            }

        }
        else {

            pacientes.push(paciente);

            mostrarMensaje(
                "Paciente guardado correctamente.",
                "exito"
            );

        }


        // =====================================================
        // GUARDAR EN LOCALSTORAGE
        // =====================================================

        guardarLocalStorage();


        // =====================================================
        // ACTUALIZAR TABLA
        // =====================================================

        mostrarPacientes(pacientes);


        // =====================================================
        // LIMPIAR FORMULARIO
        // =====================================================

        formulario.reset();

    }
);


// =====================================================
// LIMPIAR RUT PARA COMPARAR
// =====================================================

function limpiarRut(valorRut) {

    return valorRut
        .replace(/\./g, "")
        .replace("-", "")
        .toUpperCase();

}


// =====================================================
// GUARDAR LOCAL STORAGE
// =====================================================

function guardarLocalStorage() {

    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );

}


// =====================================================
// MOSTRAR PACIENTES
// =====================================================

function mostrarPacientes(lista) {

    tablaPacientes.innerHTML = "";


    if (lista.length === 0) {

        tablaPacientes.innerHTML = `

            <tr>

                <td colspan="7">

                    No existen pacientes registrados.

                </td>

            </tr>

        `;

        return;

    }


    lista.forEach(
        function(paciente) {

            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td>
                    ${paciente.rut}
                </td>

                <td>
                    ${paciente.nombres}
                </td>

                <td>
                    ${paciente.apellidos}
                </td>

                <td>
                    ${paciente.ciudad}
                </td>

                <td>
                    ${paciente.telefono}
                </td>

                <td>
                    ${paciente.email}
                </td>

                <td>
                    ${paciente.estadoCivil}
                </td>

            `;


            tablaPacientes.appendChild(fila);

        }
    );

}


// =====================================================
// BOTÓN LIMPIAR
// =====================================================

btnLimpiar.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "¿Desea limpiar todos los campos?"
            );


        if (confirmar) {

            formulario.reset();

            mostrarMensaje(
                "Formulario limpiado.",
                "exito"
            );

            rut.focus();

        }

    }
);


// =====================================================
// BOTÓN CERRAR
// =====================================================

btnCerrar.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "¿Desea cerrar la aplicación?"
            );


        if (confirmar) {

            document.body.innerHTML = `

                <div
                    style="
                        text-align:center;
                        margin-top:100px;
                        font-family:Arial;
                    "
                >

                    <h1>
                        Aplicación cerrada
                    </h1>

                    <p>
                        Puede cerrar esta pestaña.
                    </p>

                </div>

            `;

        }

    }
);


// =====================================================
// BUSCAR POR APELLIDO
// =====================================================

btnBuscar.addEventListener(
    "click",
    function() {

        const apellidoBuscado =
            buscarApellido.value
                .trim()
                .toLowerCase();


        if (apellidoBuscado === "") {

            alert(
                "Ingrese un apellido para buscar."
            );

            buscarApellido.focus();

            return;

        }


        const resultados =
            pacientes.filter(
                paciente =>
                    paciente.apellidos
                        .toLowerCase()
                        .includes(apellidoBuscado)
            );


        mostrarPacientes(resultados);


        if (resultados.length === 0) {

            mostrarMensaje(
                "No se encontraron pacientes con ese apellido.",
                "error"
            );

        }
        else {

            mostrarMensaje(
                `Se encontraron ${resultados.length} registro(s).`,
                "exito"
            );

        }

    }
);


// =====================================================
// MOSTRAR TODOS
// =====================================================

btnMostrarTodos.addEventListener(
    "click",
    function() {

        buscarApellido.value = "";

        mostrarPacientes(pacientes);

        mostrarMensaje(
            "Se muestran todos los registros.",
            "exito"
        );

    }
);


// =====================================================
// SOLO NÚMEROS EN TELÉFONO
// =====================================================

telefono.addEventListener(
    "input",
    function() {

        telefono.value =
            telefono.value.replace(/\D/g, "");

    }
);


// =====================================================
// INICIAR APLICACIÓN
// =====================================================

mostrarPacientes(pacientes);