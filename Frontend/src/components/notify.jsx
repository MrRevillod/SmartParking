"use client"

import { useEffect,useState } from "react"
const notificaciones =  [
    {from:'carlos', 
    message:'hola mundo',
    time:'12:00'},

    {from:'otro',
    message:'chaomundo',
    time:'13:00'}
]


export default function Notify(){
    const [noty, setNoty] = useState(false)

    useEffect(() =>{
        window.addEventListener('click',(e) =>{
            if(e.target !== document.getElementById('noty')){
                setNoty(false)
            }
        })

    },[])

    return(
        <>
        <div>
            <i  id='noty' className="bi bi-envelope-exclamation-fill h1 icon-blue m-4"  onClick={(e) =>{e.preventDefault; setNoty(!noty)}} ></i>
            { 
               (notificaciones.length !== 0)  &&  <i style={{left:'20px'}} onClick={(e) =>{e.preventDefault; setNoty(!noty)}} className="position-absolute  bi bi-circle-fill text-danger "></i>
            }
            
            {noty &&
            <ul className="list-group position-absolute " style={{width:'400px',margin:'10px'}}>
                {notificaciones.map(({from,message,time},i) =>{
                    return(
                        <li onClick={(e) =>{
                            e.preventDefault;
                            alert('redirecting..')
                        }}  
                        className="link-opacity-25-hover  list-group-item d-flex justify-content-between align-items-start"
                        key={i}
                        >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{from}</div>
                          {message}
                        </div>
                        <span className="badge bg-primary rounded-pill">{time}</span>
                      </li>
                    )

                })}
            </ul>
             }
        </div>
        </>
    )

}