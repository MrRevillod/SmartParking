import { Navigate, Outlet } from "react-router-dom";
import validateSession from "../lib/useValidateSession";

const ProtectedRoute = () => {
    const validated = validateSession()
    validated.then((value) =>{
        console.log(value)
        if (!value) {
            <Navigate to={"/login"} replace />;
        }
        return <Outlet />;
    })

};

export default ProtectedRoute;
