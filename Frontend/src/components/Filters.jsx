
import { Checkbox } from "./Checkbox"
import { Checkbox2 } from "./Checkbox"

export const Filters = ({ filters, setFilters }) => {


    const onCheckHandlerActive = (ev) => {
        if (ev.target.checked) {
            setFilters({ ...filters, active: true })
        } else {
            setFilters({ ...filters, active: false })
        }


    }

    const onCheckHandlerInactive = (ev) => {

        if (ev.target.checked) {
            setFilters({ ...filters, inactive: true })
        }
        else {
            setFilters({ ...filters, inactive: false })
        }

    }


    const onCheckHandlerInactive2 = (ev) => {
        ev.preventDefault()
        setFilters({ ...filters, inactive: !filters.inactive })
        
    }

    const onCheckHandlerActive2 = (ev) => {
        ev.preventDefault()
        setFilters({ ...filters, active: !filters.active })
        
    }

    return (
        <div className="d-flex w-100  ">

            
            <div className="col   ">
                <Checkbox2 onChange={onCheckHandlerInactive2} isChecked={filters.inactive} label={"Inactivos"} />
                
            </div>
            <div className="col">
                <Checkbox2 onChange={onCheckHandlerActive2} isChecked={filters.active} label={"Activos"}/>
            </div>

        </div>

    )
}