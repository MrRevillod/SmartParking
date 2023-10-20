export default function usTimeout(ms){
    return new Promise(res => setTimeout(res, ms))
}