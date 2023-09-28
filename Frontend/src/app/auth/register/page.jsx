"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import "./styleRegister.css";
export default function Page() {
    const navigator = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {

        data.vehicles = [
            {
                patente: "BFGC45",
                model: "a",
                year: 1950,
            },
        ];


        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if(res.status == 200){
            navigator.push('./login')
        }else{
            alert(result.message)
        }

        reset();
    });

    return (
        <div className="body-register">
            <div className="maindiv">
                <form onSubmit={onSubmit} className=" mainform">
                    <div className="row">
                        <div className="col">
                            {errors.username && (
                                <span className=" form-error">
                                    {errors.username.message}{" "}
                                </span>
                            )}
                        </div>
                    </div>

                    <input
                        className="forminput "
                        type="text"
                        placeholder="Nombre completo"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "El nombre es obligatorio",
                            },
                            maxLength: {
                                value: 15,
                                message: "El maximo de caractéres es de 15",
                            },
                        })}
                    />

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
                        value={"!a1234567A"}
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Ingrese contraseña",
                            },
                            minLength: {
                                value: 6,
                                message:
                                    "La contraseña debe tener un mínimo de 6 caractéres",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "La contraseña debe tener un máximo de 20 caractéres",
                            },
                        })}
                    />

                    {errors.confirmPassword && (
                        <span className="form-error">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                    <input
                        className="forminput"
                        type="password"
                        placeholder="Confirmar Contraseña"
                        value={"!a1234567A"}
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "Confirmar contraseña",
                            },
                            validate: (value) =>
                                value === watch("password") ||
                                "Las contraseñas con coinciden",
                        })}
                    />

                    {/*                     <input
                        className="forminput"
                        type="text"
                        placeholder="Contacto (opcional)"
                        {...register("contacto")}
                    />
 */}
                    <button type="submit" className="btn to-reg-button">
                        Registrarse
                    </button>
                    <hr />
                    <div className="text-center ">
                        <p className="logininput" href="">
                            ¿Ya tienes una cuenta?
                        </p>
                    </div>

                    <div
                        type="none"
                        onClick={(e) => {
                            e.preventDefault();
                            navigator.push("../auth/login");
                        }}
                        className="btn formbutton"
                    >
                        Iniciar Sesión
                    </div>
                </form>
            </div>
        </div>
    );
}
