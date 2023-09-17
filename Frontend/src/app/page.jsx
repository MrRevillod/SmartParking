
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
    const navigator = useRouter()

    useEffect(() => {
        navigator.push("/dashboard")
    }, [])

    return (
        <>
            <h3>Loading...</h3>
        </>
    )
}
