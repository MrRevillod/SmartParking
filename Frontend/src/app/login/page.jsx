"use client"
import Logo from "@/components/Logo"
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form"
import './style.css'

export default function Page(){
    const navigator = useRouter()
    const { register, 
            handleSubmit,
            formState:{errors},
            reset } 
    = useForm();
    
    console.log(errors)
    const onSubmit = handleSubmit((data) =>{
            console.log(data)
            alert('enviando datos')
            reset()

    })
    return<>
        <div className="maindiv">
            <form onSubmit={onSubmit} className=" mainform">
                <div className="divlogo">
                    <Logo  className="formlogo" w={150} h={150} color={"#0D5492"}/>
                </div>

                {errors.correo && <span className="form-error">{errors.correo.message}</span>}
                <input  className="forminput" 
                        type="email"    
                        placeholder="Correo Electrónico"
                        {...register('correo',{
                            required:{value:true,message:'El correo es obligatorio'},
                            pattern:{value:/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,message:'Correo no válido'}
                            
                            })}
                />

{errors.contrasena && <span className="form-error">{errors.contrasena.message}</span>}
                <input  className="forminput" 
                        type="password"    
                        placeholder="Contraseña"
                        {...register('contrasena',{
                            required:{value:true,message:'Ingrese contraseña'}
                                })}
                />
                
                <button className="btn  to-reg-button">Iniciar Sesión</button>
                <div className="text-center p-3"><a  className="recoverinput"  href="">¿Olvidaste tu contraseña?</a></div>                
                <hr />
                <div onClick={( e) =>{e.preventDefault();navigator.push('../register')}} className="btn formbutton  ">Registrarse</div>


            </form>
            
        </div>
    
    </>
}