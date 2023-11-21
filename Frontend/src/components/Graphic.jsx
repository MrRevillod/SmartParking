import Chart from "react-google-charts"

export const Graphic = (date) => {



    return (
        <>
            {date[Symbol.iterator] === 'function' ??
            <Chart
                chartType="BarChart"
                data={[["Fecha", "Ingresos"], ...date]}
                width="100%"
                height="260px"
                legendToggle
                />
            }

        </>
    )
}