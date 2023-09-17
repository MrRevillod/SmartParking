
"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import './style.css'
export default function Page() {
    const navigator = useRouter()

    const { register, handleSubmit,
        formState: { errors }, watch, reset }
        = useForm();

    console.log(errors)
    const onSubmit = handleSubmit((data) => {
        console.log(data)

        alert('petición enviada')
        reset()
    })
    return <div className="body-register">
        <div className="maindiv">
            <form onSubmit={onSubmit} className=" mainform">
                <div className="row">

                    <div className="col">{errors.nombre && <span className=" form-error">{errors.nombre.message} </span>}</div>
                    {errors.apellido && <span className=" col form-error">{errors.apellido.message}</span>}
                </div>

                <div className=" d-flex flex-row gap-3 ">
                    <input className="forminput "
                        type="text"
                        placeholder="Nombre"
                        {...register('nombre', {
                            required: { value: true, message: 'El nombre es obligatorio' },
                            maxLength: { value: 15, message: 'El maximo de caractéres es de 15' }
                        })} />

                    <input className="forminput "
                        type="text"
                        placeholder="Apellido"
                        {...register('apellido', {
                            required: { value: true, message: 'El apellido es obligatorio' },
                            maxLength: { value: 15, message: 'El maximo de caractéres es de 15' }

                        })} />
                </div>

                {errors.correo && <span className="form-error">{errors.correo.message}</span>}
                <input className="forminput"
                    type="email"
                    placeholder="Correo Electrónico"
                    {...register('correo', {
                        required: { value: true, message: 'El correo es obligatorio' },
                        pattern: { value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, message: 'Correo no válido' }

                    })} />

                {errors.contrasena && <span className="form-error">{errors.contrasena.message}</span>}
                <input className="forminput"
                    type="password"
                    placeholder="Contraseña"
                    {...register('contrasena', {
                        required: { value: true, message: 'Ingrese contraseña' },
                        minLength: { value: 6, message: 'La contraseña debe tener un mínimo de 6 caractéres' },
                        maxLength: { value: 20, message: 'La contraseña debe tener un máximo de 20 caractéres' }
                    })}
                />

                {errors.confirmarContrasena && <span className="form-error">{errors.confirmarContrasena.message}</span>}
                <input className="forminput"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    {...register('confirmarContrasena', {
                        required: { value: true, message: 'Confirmar contraseña' },
                        validate: value => value === watch
                            ('contrasena') || 'Las contraseñas con coinciden'
                    })}
                />


                <input className="forminput" type="text" placeholder="Contacto (opcional)" {...register('contacto')} />

                <button type="submit" className="btn to-reg-button">Registrarse</button>
                <hr />
                <div className="text-center "><p className="logininput" href="">¿Ya tienes una cuenta?</p></div>

                <div type="none" onClick={(e) => { e.preventDefault(); navigator.push('../auth/login') }} className="btn formbutton">Iniciar Sesión</div>

            </form>

        </div>

    </div>
}