import { motion } from "framer-motion";


export default function Cardy({ reservas }) {
    return (
        reservas.map(({ _id, username, patente, parking,status }) => (
            <motion.div
                key={_id}
                className="     
                 row fs-4 icon-blue bg-white w-100 py-3  border-blue border rounded-bottom
                "

                initial={{ x: -60, borderWidth:"10px" }}
                animate={{ x: 0 , borderWidth:"10px"}}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
            >
                <p className="col-3 ">{username}</p>
                <p className="col-3  "> {patente}</p>
                <p className="col-3">{parking}</p>
                <p className="col-3">{status}</p>
            </motion.div>
        )
        )
    )
}
