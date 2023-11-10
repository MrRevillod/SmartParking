
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