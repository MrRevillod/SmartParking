"use client"

export const validateSession =  async () =>{
    if (localStorage.getItem('token')) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/confirm-session`,{
            method:'POST',
            headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}
        })
        const response = await res.json( )
        console.log(response)
        return ( response?.message === 'OK' )
    } else {
        return false
    }
}