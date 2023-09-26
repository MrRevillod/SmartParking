"use client"
import { validateSession } from "@/lib/useValidateSession"
import { useEffect } from "react"

export default function Template({ children }) {
    
    let validate = false

    useEffect( () =>{
        const getValidate =  async () =>{
            return await validateSession()
        }

        validate = getValidate()
    },[])
   
        
    return <>
        {validate ? <div>{children}</div> : <button  >login</button>}
    </>
  }