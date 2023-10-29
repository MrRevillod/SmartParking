
import { API_URL } from "./env.js"

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