
const userFormater = (user) => {
    return (
        {
            username: user.username.toUpperCase(),
            email: user.email,
            role: user.role === "USER_ROLE"
                ? "Usuario Móvil"
                : "Usuario temporal",

            active: user.active
                ? "activo"
                : "inactivo",
        }

    )
} 