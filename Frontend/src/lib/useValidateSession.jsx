
import { API_URL } from "./env.js"
import { Toast } from "./Toast.jsx"
import { customUseTimeout } from "./useTimeout.jsx"

export const validateSession = async () => {

    if (localStorage.getItem('token')) {

        const res = await fetch(`${API_URL}/auth/confirm-session`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })

        const response = await res.json()
        return (response?.message === 'OK')
    }

    return false
}

export const validation = async (setLoaded, navigator,socket) => {
    
    setLoaded(false)
    const validated = await validateSession()
    await customUseTimeout(1000)

    if (!validated) {
        navigator("/login")
        Toast({ msg: "Debes iniciar sesión" })

        socket.disconnect()
    } else {
        setLoaded(true)
    }
    
}