
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'


import Modal from 'react-modal'

import { Loading } from './Loading'
import { UserCardBody } from './UserCardBody'
import { UserCardFooter } from './UserCardFooter'
import { UserCardHeader } from './UserCardHeader.jsx'




import './UserModal.css'



export const UserModal = ({ user, userId, isModalVisible, setIsModalVisible }) => {
    const navigator = useNavigate()
    const token = localStorage.getItem("token")

    const { isLoading, error, data } = useQuery('user', () => {
        console.log(user.username)
        if (userId ) {
            return (
                fetch(`${import.meta.env.VITE_API}/users/${userId}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(res =>
                        res.json()
                    ))
        }
        return  { user: user } 

    })

    if (isLoading) return <Loading />

    if (error) return <span className='text-danger text-center '>ERROR EN LA PETICIÓN</span>
    if (error) return navigator('/users')

    if (userId) {
        user = data.user
    }


    return (
        <Modal

            isOpen={isModalVisible}
            onAfterClose={() => setIsModalVisible(false)}
            onRequestClose={() => setIsModalVisible(false)}

            appElement={document.getElementById('root')}
            overlayClassName={'Overlay'}
            className={'Modal'}

        >
            <UserCardHeader user={user} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
            <UserCardBody user={user} />
            <UserCardFooter user={user} />


        </Modal>

    )
}