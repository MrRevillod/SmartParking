
export const Table = ({ data, columns }) => {

    return (
        <div className=" "> 
            <div className="row back-blue rounded-top-2 text-light" >

                {columns.map((c, i) => (
                    <div key={i} className="col fw-bold  text-start">
                        {c}
                    </div>
                ))}

            </div >

            {data.map((v) => (
                <div className="row border p-3 rounded-bottom-3" key={v._id} >
                    <div className="col text-start icon-blue ">{v.model}</div>
                    <div className="col text-start icon-blue">{v.patente}</div>
                </div>
            ))}

        </div >
    )
}