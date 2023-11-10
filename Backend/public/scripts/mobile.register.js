
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
        contact: "Formato esperado: +569xxxxxxxx.",
        password: "Ingresa una contraseña de mínimo 8 caracteres. Debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.",
        confirmPassword: "Las contraseñas deben coincidir.",
        model: "Formato esperado: Marca Modelo. Máximo 20 caracteres.",
        patente: "Formato esperado: FHBG89.",
        year: "Se espera un año entre 1970 y 2023.",
        error: "Error al registrar. Revisa tus datos e inténtalo nuevamente.",
        regPassword: "Ingresa una contraseña de mínimo 8 caracteres. Debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.",
        regConfirmPassword: "Las contraseñas deben coincidir.",
        regEmail: "Debes ingresar un correo válido y existente.",
        empty: "Debes ingresar todos los datos."
    }

    main.style.opacity = "0.8"

    const dialog = document.createElement("dialog")
    dialog.id = "dialog"
    dialog.innerHTML = `
        <h4>${messages[value]}</h1>
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

window.addEventListener("load", async () => {

    const load = document.getElementById('load')
    const mobile = document.getElementById('mobile')

    if (localStorage.getItem("token")) {

        const token = localStorage.getItem("token")
        const res = await fetch("<% baseUrl %>/api/auth/confirm-session", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.ok) {
            window.location.href = "<%= baseUrl %>/api/mobile/home"

        } else {
            localStorage.removeItem("token")
            load.style.display = "none"
            mobile.style.display = "flex"
        }
    }

    fillYears()

    load.style.display = "none"
    mobile.style.display = "flex"
})


button.addEventListener("click", async (e) => {

    console.log("click")

    const form = document.getElementById("register-form")
    const respuestaDiv = document.getElementById("response")

    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const data = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: password,
        contact: document.getElementById('contact').value,
        vehicles: {
            patente: document.getElementById('patente').value,
            model: document.getElementById('model').value,
            year: parseInt(document.getElementById('year').value)
        }
    }

    for (const key in data) {
        if (data[key] === "") {
            showInfo("empty")
            return
        }
    }

    if (!isValidEmail(data.email)) {
        showInfo("regEmail")
        return
    }

    if (password !== confirmPassword) {
        showInfo("regConfirmPassword")
        return
    }

    if (!isValidPassword(password)) {
        showInfo("regPassword")
        return
    }

    const res = await fetch("<%= baseUrl %>/api/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()

    if (res.ok) {
        alert(result.message)
        form.reset()
    } else {
        alert(result.message)
    }
})