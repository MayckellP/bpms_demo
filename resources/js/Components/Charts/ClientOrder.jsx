import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                color: "Black",
                font: {
                    size: 18,
                },
                padding: 25,
            },
        },
    },
};

export function ClientOrder(props) {
    return <Doughnut options={options} data={props.data} />;
}
