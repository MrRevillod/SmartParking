import { Pill } from "./Pill"

const imageStyle = {
    width: '27vh',
    height: '27vh'
}

export const UserCardHeader = ({ user, setIsModalVisible }) => {

    const onClickHandler = (ev) => {
        ev.preventDefault()
        setIsModalVisible(false)

    }

    return (
        <section className="position-relative" style={{ height: '35vh' }}>

            <div className=" back-blue row h-75 row " />
            <div className=" row w-100 m-0  h-25">
                <div className="col text-end  align-content-center row w-100 m-0 ">
                    <Pill bakgroundClass={"back-blue"}>
                        <div className="fs-4 px-3">{user.active ? user.parking : "--"}</div>
                    </Pill>
                </div>
            </div>
            <div className="position-absolute bottom-0  w-100  row m-0 justify-content-center">
                <img src={user.profilePicture}
                    className="rounded-circle  pb-3"
                    style={imageStyle}
                    alt="" />
            </div>
            <div className="position-absolute text-end w-100 h-100 pt-2 pe-3 top-0 ">
                <i onClick={onClickHandler} className="close-button opacity-75 bi bi-x-circle-fill h1 text-shadow text-light"/>
            </div>
        </section>
    )
} 