"use client";
import { validateSession } from "@/lib/useValidateSession";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/dashboard/loading";

export default function Template({ children }) {
    const [loading,setLoading] = useState(true)
    const router = useRouter();
    const path = usePathname();
    useEffect(() => {
        const getValidate = async () => {
            
            const validate = await validateSession();

            if (!validate && path.startsWith("/dashboard")){
                router.push("/auth/login")
                
            }else{
                setLoading(false)
            }
        };

        getValidate();
    }, [path]);

    return <>

    {loading ?
        <Loading></Loading>
        : <div>{children}</div>
    }
        
    </>;
}
