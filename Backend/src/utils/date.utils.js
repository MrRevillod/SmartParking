
export const formattedTime = () => {

    try {

        const dateNow = Date.now()
        const now = new Date(dateNow)

        const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
        const dateAndTime = `${date} ${time}`

        return dateAndTime

    } catch (error) {
        throw { status: 500, message: MESSAGES.UNEXPECTED }
    }
}