

 const validateSession =  async () =>{
    if (localStorage.getItem('token')) {

        const res = await fetch(`${import.meta.env.VITE_API}/auth/confirm-session`,{
            method:'POST',
            headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}
        })
        const response = await res.json( )

        return ( response?.message === 'OK' )
    } else {
        return false
    }
}

export default validateSession