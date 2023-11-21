
let timerInterval

export const startTimer = async (io, socket, data) => {
    let timeRemaining = 10

    timerInterval = setInterval(() => {
        let functionActive = true
        socket.emit("timer-active", functionActive)
        const minutes = Math.floor(timeRemaining / 60)
        const seconds = timeRemaining % 60

        displayTimer(io, socket, minutes, seconds)
        if (timeRemaining <= 0) {
            clearInterval(timerInterval)
            functionActive = false
            socket.emit("timer-get", {
                message: "Ya puedes hacer una nueva solicitud",
                bool: false
            })
            socket.emit("timer-active", functionActive)
        } else {
            timeRemaining--
        }
    }, 1000)
}

export const displayTimer = async (io, socket, minutes, seconds) => {

    const displayText = `Ya has hecho una solicitud antes. Tiempo de Espera: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    socket.emit("timer-get", {
        message: displayText,
        bool: true
    })
}