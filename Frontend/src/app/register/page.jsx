import Logo from "@/components/Logo"

export default function Page(){
    return<>
        <div className="maindiv">
            <form onSubmit={'go'} className=" mainform">
                <div className=" d-flex flex-row gap-3 ">            
                    <input className="forminput " type="text" placeholder="Nombre"/>
                    <input className="forminput " type="text" placeholder="Apellido"/>
                </div>
                <input className="forminput" type="text" placeholder="Correo Electrónico"/>
                <input className="forminput" type="text" placeholder="Contraseña"/>
                <input className="forminput" type="text" placeholder="Confirmar Contraseña"/>
                <input className="forminput" type="text" placeholder="Contacto (opcional)"/>
                <button className="btn to-reg-button">Registrarse</button>
                <hr />
                <div className="text-center "><p  className="logininput"  href="">¿Ya tienes una cuenta?</p></div>

                <button className="btn formbutton">Iniciar Sesión</button>


            </form>
            
        </div>
    
    </>
}