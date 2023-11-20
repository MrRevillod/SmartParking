
const button = document.getElementById("reg-button")
const main = document.getElementById("main-cont")
const body = document.querySelector("body")
const year = document.getElementById("year")

const fillYears = () => {

    const years = []

    for (let i = 1970; i <= 2023; i++) {
        years.push(i)
    }

    years.reverse()

    years.forEach(year => {
        const option = document.createElement("option")
        option.value = year
        option.innerHTML = year
        document.getElementById("year").appendChild(option)
    })
}

const showInfo = (value) => {

    const existingDialog = document.getElementById("dialog")
    if (existingDialog) {
        existingDialog.close()
        existingDialog.remove()
    }

    const messages = {
        username: "Ingresa tu nombre completo.",
        email: "Debes ingresar un correo válido y existente.",
        contact: "Formato de 9 digitos: 9xxxxxxxx.",
        password: "Ingresa una contraseña de mínimo 8 caracteres. Debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.",
        confirmPassword: "Las contraseñas deben coincidir.",
        model: "Formato esperado: Marca Modelo. Máximo 20 caracteres.",
        patente: "Formato esperado: FHBG89.",
        year: "Se espera un año entre 1970 y 2023.",
        error: "Error al registrar. Revisa tus datos e inténtalo nuevamente.",
        regPassword: "Ingresa una contraseña de mínimo 8 caracteres. Debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.",
        regConfirmPassword: "Las contraseñas deben coincidir.",
        regEmail: "Debes ingresar un correo válido y existente.",
        regPatente: "Formato esperado: FHBG89.",
        regContact: "Formato de 9 digitos: 9xxxxxxxx.",
        empty: "Debes ingresar todos los datos.",
        userExist: "El usuario ya existe.",
    }

    const message = !messages[value] ? value : messages[value]

    main.style.opacity = "0.8"

    const dialog = document.createElement("dialog")
    dialog.id = "dialog"
    dialog.innerHTML = `
        <h4>${message}</h1>
        <button id="dialog-button">Aceptar</button>
    `

    body.appendChild(dialog)

    const dialogButton = document.getElementById("dialog-button")

    dialog.showModal()

    dialogButton.addEventListener("click", () => {
        dialog.close()
        dialog.remove()
        main.style.opacity = "1"
    })

    dialog.addEventListener("mousedown", (e) => {
        if (e.target === dialog) {
            dialog.close()
            dialog.remove()
            main.style.opacity = "1"
        }
    })
}

