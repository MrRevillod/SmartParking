export default function useTimeout(ms){
    return new Promise(res => setTimeout(res, ms))
}