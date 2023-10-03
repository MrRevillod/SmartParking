"use client";

import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "dotenv/config";
import "./styleLogin.css";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
    const navigator = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        if (res.status == 200) {
            navigator.push("/dashboard");
            localStorage.setItem("token", result.token);
        } else if (res.status == 401) {
            alert(result.message);
            reset();
        }
    });

    return (
        <div className="body-login">
            <div className="maindiv">
                <Suspense>
                    <form onSubmit={onSubmit} className=" mainform">
                        <div className="divlogo">
                            <Logo
                                className="formlogo"
                                w={150}
                                h={150}
                                color={"#0D5492"}
                            />
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
                                href={`${process.env.NEXT_PUBLIC_API}/auth/forgot-password`}
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </form>
                </Suspense>
            </div>
        </div>
    );
}
