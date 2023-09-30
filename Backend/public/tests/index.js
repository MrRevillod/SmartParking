
const socket = io("http://localhost:3000")
const button = document.getElementById("button")

button.addEventListener("click", (event) => {

    const username = document.getElementById("username")
    const patente = document.getElementById("patente")
    const contacto = document.getElementById("contacto")

    const data = {
        username: username.value,
        patente: patente.value,
        contact: contacto.value
    }
    event.preventDefault()
    console.log(data)

    socket.emit("access-request", data)
})

socket.on("access-denied", ({ message }) => {
    console.log(message)
})

socket.on("access-ok", ({ message, place }) => {
    console.log(message, place)
})