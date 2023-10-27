
import Modal from 'react-modal'

import { UserCardBody } from './UserCardBody'
import { UserCardFooter } from './UserCardFooter'
import { UserCardHeader } from './UserCardHeader.jsx'

import './UserModal.css'

export const UserModal = ({ user, isModalVisible, setIsModalVisible }) => {
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