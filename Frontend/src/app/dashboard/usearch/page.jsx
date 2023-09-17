"use client"

import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import { useEffect, useState } from 'react'



const table_columns = ['Foto', 'Nombre', 'Registro', 'Estado', 'Ubicación', 'Chat']
const users = [
    {
        _id: '1',
        name: 'carlos',
        email: 'carlos@gmail.com',
        password: '1234',
        role: 'user',
        contacto: '123455',
        imageUrl: 'https://dummyimage.com/300x300'
    },

    {
        _id: '2',
        name: 'charlie',
        email: 'charlie@gmail.com',
        password: '1234',
        role: 'user',
        contacto: '123455',
        imageUrl: 'https://dummyimage.com/300x300',
    },

    {
        _id: '3',
        name: 'noobUser',
        email: 'noobUser@gmail.com',
        password: '1234',
        role: 'user',
        contacto: '123455',
        imageUrl: 'https://dummyimage.com/300x300'
    }
]

const patentes = ['12-12-12', 'xd-xd-xd', '33-33-33']
const estacionamiento = ['B-12', 'null', 'B-14']


async function getData() {
    const res = await fetch('https://api.example.com/...')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
   




export default  function Page() {
    const [search, setSearch] = useState('')


    let results = []

    if (!search) {
        results = users
    } else {
        results = users.filter((dato) =>
            dato.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }




    return (<>


        <div className="mt-4 ">
            <div className="d-flex flex-column justify-content-center" >
                <div className='text-center display-5 fw-bold mb-3  ' >USUARIOS</div>
                <div className=" d-flex border rounded-1 w-25 align-self-center mt-3 ">
                    <input type="text"
                        className="searchbar x col-11 border-0 pe-0  small p-2"
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        value={search}
                        placeholder='Ingrese nombre de usuario'
                    />

                    <div className="searchIcon col-1 border border-0 p-2  justify-content-end d-grid">
                        <i className="bi bi-search icon-blue"></i>
                    </div>

                </div>

                <table className=" w-75 mt-2 align-self-center">

                    <thead className='backblue rounded-3 '>
                        <tr className='w-100 rounded-3  ' >
                            {table_columns.map((e, i) => {

                                return (
                                    <th key={i} className='  ps-2 pe-2 text-light form-text'>{e}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((e, i) => {
                                return (
                                    <tr key={e._id} className='rounded-4 shadow   '>
                                        <td className='  p-2 '><img src={e.imageUrl} className='rounded-circle profile-img'></img></td>
                                        <td className='p-2'>{e.name}</td>
                                        <td className='p-2'>{patentes[i]}</td>
                                        <td className='p-2'>{(estacionamiento[i] !== "null") ? <i className="bi bi-circle-fill text-success h3"></i> : <i className="bi bi-circle-fill text-danger h3"></i>}</td>
                                        <td className='p-2'>{estacionamiento[i]}</td>
                                        <td className='p-2  '>{(estacionamiento[i] !== "null") ? <i className="h3 bi bi-chat-dots-fill icon-blue h-100 "   ></i>
                                            : <i className="h3 bi bi-chat-dots-fill opacity-25 h-100 "   ></i>}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>



                </table>
            </div>
        </div>







    </>)
}