
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

export const verificationCodeSubject = "Smart Parking - Codigo de verificación"

export const verificationCodeTemplate = (username, verCode, url) => {
    return `
        <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table width="100%" bgcolor="#0D5492">
                <tr>
                    <td>
                        <h1 style="color: white; padding: 20px; text-align: center;">Smart Parking</h1>
                    </td>
                </tr>
            </table>
            <table width="100%" style="background-color: #fff; margin: 0 auto;">
                <tr>
                    <td>
                        <h2 style="color: #333333; text-align: center;">Marcar Salida</h2>
                        <p style="color: #333333; text-align: center;">Estimad@ ${username},</p>
                        <p style="color: #333333; text-align: center;">Tu codigo de verificacion es el siguiente: </p>
                        <p style="font-size: 20px; font-weight: bold; color: #0D5492; text-align: center;">${verCode}</p>
                        <p style="color: #333333; text-align: center;">Este código garantiza la seguridad de tus datos y verifica que solo tu puedes salir del estacionamiento</p>
                        <br>
                        <p style="color: #333333; text-align: center;">Si deseas salir del estacionamiento, por favor haz clic en el siguiente enlace:</p>
                        <p style="text-align: center;"><a href="${url}" style="font-size: 24px; color: #0D5492; text-decoration: none;">Marcar Salida</a></p>
                        <p style="color: #333333; text-align: center;">Si no has solicitado este código de verificación, por favor ignora este mensaje.</p>
                        <p style="color: #333333; text-align: center;">Atentamente,</p>
                        <p style="color: #333333; text-align: center;">El equipo de Smart Parking</p>
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
