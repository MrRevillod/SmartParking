
import './Checkbox.css'

export const Checkbox = ({ onChange, isChecked }) => {
    return (
        <input type="checkbox" className="form-check-inline" onChange={onChange} checked={isChecked} />
    )
}

export const Checkbox2 = ({ onChange, isChecked, label }) => {

    return (
        <div className='d-flex align-items-center' onClick={onChange} >
            <div className='  '>
                {!isChecked ? <i className="h1 icon-blue bi bi-toggle-off"></i>
                    : <i className="h1 icon-blue bi bi-toggle-on"></i>}
            </div>
            <div className='ps-2 fw-semibold icon-blue' >{label}</div>
        </div>
    )
}