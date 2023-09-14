
export const validationSubject = "Smart Parking - Validar tu cuenta"

export const validationTemplate = (url) => {
    return `
        <body>
            <table width="100%" bgcolor="#0D5492">
                <tr>
                    <td>
                        <h1 style="color: white; padding: 20px;">Smart Parking</h1>
                    </td>
                </tr>
            </table>
            <table width="100%">
                <tr>
                    <td>
                        <h2 style="color: black;">Validación de Cuenta</h2>
                        <p style="color: black;">¡Gracias por unirte a Smart Parking! Para validar tu cuenta, por favor haz clic en el siguiente enlace:</p>
                        <p><a href="${url}">Validar cuenta</a></p>
                        <p style="color: black;">Si no reconoces esta solicitud, puedes ignorar este mensaje.</p>
                        <p style="color: black;">Atentamente,</p>
                        <p style="color: black;">El equipo de Smart Parking</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" bgcolor="#0D5492">
                            <tr>
                                <td>
                                    <p style="color: white; text-align: center; padding: 10px;">© ${new Date().getFullYear()} Smart Parking</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    `
}


export const changePasswordSubject = "Smart Parking - Cambiar contraseña"

export const changePasswordTemplate = (url) => {
    return `
        <body>
            <table width="100%" bgcolor="#0D5492">
                <tr>
                    <td>
                        <h1 style="color: white; padding: 20px;">Smart Parking</h1>
                    </td>
                </tr>
            </table>
            <table width="100%">
                <tr>
                    <td>
                        <h2 style="color: black;">Cambio de Contraseña</h2>
                        <p style="color: black;">Has solicitado cambiar tu contraseña en Smart Parking. Por favor, utiliza el siguiente enlace para completar el proceso:</p>
                        <p><a href="${url}">Cambiar contraseña</a></p>
                        <p style="color: black;">Si no has solicitado este cambio de contraseña, por favor ignora este mensaje.</p>
                        <p style="color: black;">Atentamente,</p>
                        <p style="color: black;">El equipo de Smart Parking</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" bgcolor="#0D5492">
                            <tr>
                                <td>
                                    <p style="color: white; text-align: center; padding: 10px;">© ${new Date().getFullYear()} Smart Parking</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    `
}

