
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(email)
}

const isValidPatente = (patente) => {
    const patenteRegex = /^[BCDFGHJKLMNPQRSTVWXYZ]{4}(1[0-9]|[2-9][0-9])$/
    return patenteRegex.test(patente)
}

const isValidContact = (contact) => {
    const contactRegex = /^\+569\d{8}$/
    return contactRegex.test(contact)
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

const toggleViewPassword = () => {

    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("confirmPassword")

    const viewIcon = document.getElementById("view-icon")
    const hideIcon = document.getElementById("hide-icon")

    if (password.type === "password") {
        password.type = "text"
        confirmPassword.type = "text"
        viewIcon.style.display = "none"
        hideIcon.style.display = "block"
    } else {
        password.type = "password"
        confirmPassword.type = "password"
        viewIcon.style.display = "block"
        hideIcon.style.display = "none"
    }
}