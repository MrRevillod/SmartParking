import {  motion } from "framer-motion";

const rowStyle = {
    borderRadius: "5px",
    padding: "2vw",
    margin: "1vw",
    gap: "10vw",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "left",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    boxShadow: "6px 6px 15px 0px rgba(0,0,0,0.3)",
    cursor: "pointer",
    minWidth: "100%",
    border:"1px white solid"
};


export default function Cardy({ _id, username, patente, parking }) {
    return (
        <motion.div
            key={_id}
            className="    
                back-blue
                "
            style={rowStyle}
            
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{duration: 0.3}}
            exit={{ opacity: 0 }}
        >
            <p className="col text-start">{username}</p>
            <p className="col text-start "> {patente}</p>
            <p className="col text-start">{parking}</p>
        </motion.div>
    );
}
