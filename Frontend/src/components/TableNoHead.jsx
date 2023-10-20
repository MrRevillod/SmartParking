export const TableNoHead = ({ data, labels }) => {

    return (
        < div className=" ">
            {
                data.map((v,i) => (
                    <div className="row border " key={v._id} >
                        <div className="col text-start fw-bold">{labels[i]}</div>
                        <div className="col text-start fw-bold">{v}</div>
                    </div>


                ))
            }

        </div >
    )

}