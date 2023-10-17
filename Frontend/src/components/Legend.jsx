export const Legend = ({status}) =>{
    return(
        <div className="d-flex col mx-4 p-4">
            <div className={`p-3 ${status}`}></div>
            <div className="fs-5 fw-semibold ps-3 ">{status}</div>

        </div>
    )
}