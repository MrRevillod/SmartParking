import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import Logo from "@/components/Logo"
import 'bootstrap-icons/font/bootstrap-icons.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
        <header>
        <div className="divlogo2">
          <Logo className="formlogo" w={50} h={50} color={"#0D5492"} />
        </div>
          <div className='container1'>
          <div>
          <nav>
            <ul>
            <li className="btn to-reg-button1">
                <Link href="/"  style={{ textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="btn to-reg-button1">
                <Link href="estacionamiento" style={{ textDecoration: 'none' }}>Estacionamiento</Link>
              </li>
              <li className="btn to-reg-button1"> 
                <Link href="usuario" style={{ textDecoration: 'none' }}>Usuarios</Link>
              </li>
              <li className="btn to-reg-button1">
                <Link href="mensajes" style={{ textDecoration: 'none' }}>Mensajes</Link>
              </li>
            </ul>
          </nav>
          </div>
          </div>
          <div className='icono1'>
            <Link href="login"><h2 className="bi bi-box-arrow-left"></h2></Link>
          </div>
        </header>
        
          {children}
        </div>
      </body>
    </html>
  )
}