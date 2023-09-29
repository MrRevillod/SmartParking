"use client";
import { validateSession } from "@/lib/useValidateSession";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }) {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const getValidate = async () => {
            const validate = await validateSession();
            if (
                !validate &&
                path !== "/auth/login" &&
                path !== "/auth/register"
            ) {
                alert("Debe iniciar sesión");
                router.push("../auth/login");
            } else if (
                validate &&
                (path === "/auth/login" || path === "/auth/register")
            ) {
                router.push("../dashboard");
            }
        };

        getValidate();
    }, [path]);

    return <>{<div>{children}</div>}</>;
}
