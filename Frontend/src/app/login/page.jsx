import Logo from "@/components/Logo"

export default function Page(){
    return<>

        <div className="maindiv">
            <form onSubmit={'go'} className=" mainform">
                <div className="divlogo">
                    <Logo  className="formlogo" w={150} h={150} color={"#0D5492"}/>
                </div>

                <input className="forminput" type="text" placeholder="Correo Electrónico"/>
                <input className="forminput" type="text" placeholder="Contraseña"/>
                <button className="btn formbutton">Iniciar Sesión</button>
                <div className="text-center p-3"><a  className="recoverinput"  href="">¿Olvidaste tu contraseña?</a></div>                
                <hr />
                <button className="btn to-reg-button">Registrarse</button>


            </form>
            
        </div>
    
    </>
}