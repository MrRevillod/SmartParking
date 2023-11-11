
export const stringToBinary = (palabra) => {

    try {

        const binario = palabra.split('').map(char => char.charCodeAt(0).toString(2)).join('')
        const numero = parseInt(binario, 2)

        return numero

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}

export const guestCode = (toBinUsername, toBinContact, toBinPatente) => {

    try {

        const randomNum = Math.floor(Math.random() * 1000000)
        const sumaNum = toBinUsername + toBinContact + toBinPatente
        const toSixNumCode = ("000000" + (sumaNum % 1000000) + randomNum).slice(-6)

        return toSixNumCode

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}