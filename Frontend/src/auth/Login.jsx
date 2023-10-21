
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Suspense, useLayoutEffect, useState } from "react"

import { Logo } from "../components/Logo"
import { Toast } from "../lib/Toast"
import { validateSession } from "../lib/useValidateSession"

import "./Login.css"

export const Login = () => {

    const navigator = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = handleSubmit(async (data) => {

        const res = await fetch(`${import.meta.env.VITE_API}/auth/admin-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        const result = await res.json()

        if (res.status === 200) {

            localStorage.setItem("token", result.token)
            await Toast({ msg: "Sesion iniciada correctamente" })
            navigator("/dashboard")

        } else {
            setError(result.message)
            reset()
        }
    })

    useLayoutEffect(() => {

        const validation = async () => {
            const validated = await validateSession()
            if (validated) {
                navigator("/")
            }
            setLoading(false)
        }

        validation()
    })

    return (
        <>
            {!loading && (
                <div className="body-login">
                    <div className="maindiv">
                        <Suspense>
                            <motion.form
                                onSubmit={onSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className=" mainform"
                            >
                                <div className="divlogo">
                                    {error.length === 0 ? <Logo
                                        className="formlogo"
                                        w={150}
                                        h={150}
                                        color={"#0D5492"}
                                    /> : <div className="text-danger">{error}</div>}
                                </div>
                                {errors.email && (
                                    <span className="form-error">
                                        {errors.email.message}
                                    </span>
                                )}
                                <input
                                    className="forminput"
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "El correo es obligatorio",
                                        },
                                        pattern: {
                                            value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                                            message: "Correo no válido",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <span className="form-error">
                                        {errors.password.message}
                                    </span>
                                )}
                                <input
                                    className="forminput"
                                    type="password"
                                    placeholder="Contraseña"
                                    autoComplete="on"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Ingrese contraseña",
                                        },
                                    })}
                                />
                                <button className="to-reg-button" type="submit">
                                    Iniciar Sesión
                                </button>
                                <div className="text-center p-3">
                                    <Link
                                        className="recoverinput"
                                        to={`${import.meta.env.VITE_API
                                            }/auth/forgot-password`}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            </motion.form>
                        </Suspense>
                    </div>
                </div>
            )}
        </>
    )
}
