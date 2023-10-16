import { motion } from "framer-motion";


export default function Cardy({ reservas }) {
    return (
        reservas.map(({ _id, username, patente, parking }) => (
            <motion.div
                key={_id}
                className="     
                 row fs-3 icon-blue  w-100 py-3  border-blue border rounded-bottom
                "

                initial={{ x: -60, borderWidth:"10px" }}
                animate={{ x: 0 , borderWidth:"10px"}}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
            >
                <p className="col-4 ">{username}</p>
                <p className="col-4  "> {patente}</p>
                <p className="col-4">{parking}</p>
            </motion.div>
        )
        )
    )
}
