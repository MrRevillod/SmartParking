
const socket = io("http://localhost:3000")
const button = document.getElementById("button")

button.addEventListener("click", (event) => {

    event.preventDefault()

    const username = document.getElementById("username")
    const contact = document.getElementById("contact")
    const email = document.getElementById("email")

    const data = {
        username: username.value,
        contact: contact.value,
        email: email.value
    }

    socket.emit("access-request", data)
})

socket.on("access-denied", ({ message }) => {
    console.log(message)
})

socket.on("access-ok", ({ message, place }) => {
    console.log(message, place)
})