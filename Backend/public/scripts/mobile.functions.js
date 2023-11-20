const main = document.getElementById('mobile')
const body = document.querySelector('body')

let patente;



const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(email)
}

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*,./|"'<:;>{}`~]).{8,}$/
    return passwordRegex.test(password)
}

const setResponse = (message) => {
    const root = document.getElementById("response")
    root.innerHTML = message
    root.style.display = "block"

    setTimeout(() => {
        root.innerHTML = ""
    }, 3000)
}



const selectVehicle = (vehicles) => {
    patente = vehicles[0]  // Default selection
    const existingDialog = document.getElementById("dialog")
    
    if (existingDialog) {
        existingDialog.close()
        existingDialog.remove()
    }

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


    // CHANGE 
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
