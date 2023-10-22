
export const customUseTimeout = (ms) => {
    return new Promise(res => setTimeout(res, ms))
}