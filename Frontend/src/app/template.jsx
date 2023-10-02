"use client";
import { validateSession } from "@/lib/useValidateSession";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Template({ children }) {
    const [loading,setLoading] = useState(true)
    const router = useRouter();
    const path = usePathname();


    useEffect(() => {
        const getValidate = async () => {
            
            const validate = await validateSession();

            if (!validate && path !== "/auth/login"){
                router.push("../auth/login")
            }else if(path === "/auth/login" && validate){
                router.push("../dashboard")
            }
            else{
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
