import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


export const LogChart = ({ logs }) => {
    return (
        <LineChart width={700} height={250} data={logs.slice(-7)}>
            <Line type="monotone" dataKey="value" stroke="#0D5492" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}