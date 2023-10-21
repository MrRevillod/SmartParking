
import { motion } from "framer-motion"

const colors = {
    "disponible": "rgb(200, 200, 200)",
    "ocupado": "rgb(252, 57, 57)",
    "reservado": "#8eb9ff",
}

export const StatusCircle2 = ({ percent, label }) => {

    const bg1 = `conic-gradient(
        #fff 0% 0%, 
        transparent 0% 100%  
    )`

    const bg2 = `conic-gradient(
        ${colors[label]} 0% ${percent}%, 
        transparent 0% 100%  
    )`

    const mainStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    }

    const loaderStyle = {
        width: " 25vh",
        height: "25vh",
        //     background: `conic-gradient(
        //     ${colors[label]} 0% ${percent}%, 
        //     transparent 0% 100%  
        // )`,
        color: colors[label],
        borderRadius: "100%",
    }

    const loaderFillStyle = {
        marginTop: "13%",
        marginLeft: "13%",
        width: "74%",
        height: "74%",
        borderRadius: "100%",
    }

    return (
        <div className=" mx-3 col" style={{ height: "25vh" }} >
            <div style={mainStyle} className="border rounded-circle ">
                <motion.div
                    initial={{ background: bg1 }}
                    animate={{ background: bg2 }}
                    transition={{ duration: 0.2 }}
                    style={loaderStyle}  >
                    <div style={loaderFillStyle} className=" border bg-white pt-2 d-flex justify-content-center align-content-center " >
                        <div className="display-1 fw-bold m-0 mt-4 " >{percent}</div>
                        <div className=" d-grid h-100 align-content-center"><div>%</div></div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}