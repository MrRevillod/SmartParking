
const basicStyle = "border  border-bottom-0 border-blue rounded-4 px-1 py-0 fw-semibold fs-5 btn rounded-bottom-0  "
const activeClass = "w-100 h-100 back-blue text-light "
const inactiveClass = "w-100 h-100  icon-blue"

export const ToggleTableButton = ({ active,setActive }) => {
    const onClickHandlerLeft = (event) => {
        event.preventDefault()
        setActive(false)
    }
    const onClickHandlerRight = (event) => {
        event.preventDefault()
        setActive(true)
    }
    return (
        <div className="row m-0 w-25  ms-4  ">
            <div className="col-6 p-0">
                <div className={basicStyle +  " border-end-0 rounded-end-0   " + (!active ? activeClass : inactiveClass)}
                    onClick={onClickHandlerLeft}
                > Reservas</div>
            </div>
            <div className="col-6 p-0">
                <div className={basicStyle + " border-start-0 rounded-start-0  "+ (active ? activeClass : inactiveClass)}
                    onClick={onClickHandlerRight}
                > Estadísticas</div>
            </div>
        </div>

    )
}