
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



const selectVehicle = (vehicles,socket,req) => {

    const main = document.getElementById('mobile')
    const body2 = document.body
    
    const existingDialog = document.getElementById("dialog")
    
    if (existingDialog) {
        existingDialog.close()
        existingDialog.remove()
    }
    const dialog = document.createElement("dialog")
    dialog.id = "dialog"

    const title = document.createElement("h4")
    title.innerText = "Selecciona el vehículo"
    dialog.appendChild(title)

    vehicles.forEach(vehicle => {
        const vehicleButton = document.createElement("button")
        vehicleButton.innerText = vehicle.model
        vehicleButton.className = "button"
        vehicleButton.style.margin = "5px"
        vehicleButton.addEventListener("click", (e) => {
            e.preventDefault()

            const token = localStorage.getItem("token")
            dialog.close()
            dialog.remove()
            socket.emit(req, { token, patente: vehicle.patente })
            main.style.opacity = "1"
        })
        dialog.appendChild(vehicleButton)

    })

    body2.appendChild(dialog)

    dialog.showModal()



}
