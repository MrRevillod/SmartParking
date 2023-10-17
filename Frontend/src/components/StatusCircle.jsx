import { motion } from 'framer-motion'


const boxSize = 200

const maskStyle = {
    height: `${boxSize}px`,
    width: `${boxSize}px`

}

const boxStyle = {
    height: `${boxSize}px`,
    width: `${boxSize}px`,
    x: `${-13}px`,
    zIndex: -1,


}

const percentStyle = {


}
export const StatusCircle = ({ percent, label }) => {

    const x = (percent / 100) * boxSize
    return (<>

        <div className="rounded-circle border overflow-hidden m-4  border-1 bg-white   flex-row" style={maskStyle} >
            <motion.div initial={{ y: boxSize }}
                animate={{ y: boxSize - x }}
                transition={{ duration: 1.3 }}
                className={`${label}  `}
                style={boxStyle}  >
            </motion.div>

            <motion.div
                initial={{ y: -boxSize }}
                animate={{ y: -boxSize }}
                className='d-flex  pt-5  icon-blue justify-content-center d-grid align-content-center'
                style={percentStyle}>
                <h1 className='display-2 fw-bold'>{percent}</h1><p className='fs-5' >%</p>
            </motion.div>
        </div>
    </>

    )
}