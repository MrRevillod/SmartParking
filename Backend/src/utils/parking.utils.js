
export const simulateParking = () => {

    const random = Math.random()
    const parking = {
        name: "E-01",
        active: false
    }

    return Promise.resolve(random > 0.5 ? null : parking)
}