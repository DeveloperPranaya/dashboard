// ContractsBarChart.jsx
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar, getElementsAtEvent } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ErrorMsg = styled.div`
  text-align: center;
  padding: 2rem;
  color: #555;
`;
const ChartContainer = styled.div`
  width: 100%;
  height: 500px; // or any preferred fixed height
  padding: 1rem;
`;

export default function BarChart({ showTable, individualCardData, selectedCard }) {
    const [top5Values, setTop5Values] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        if (Array.isArray(individualCardData)) {
            const topContracts = individualCardData
                .map(item => ({
                    value: item["Contracts.ContractValue"],
                    type: item["Contracts.ContractType"]
                }))
                .filter(item => Number.isFinite(item.value)) // keep only numeric values
                .sort((a, b) => b.value - a.value) // sort descending by value
                .slice(0, 5); // take top 5
            setTop5Values(topContracts);
        } else {
            console.warn('No details array found');
            setTop5Values([]);
        }
    }, [individualCardData]); // run only when `details` changes

    const top5ContractValue = top5Values.map((data) => data.value)
    const top5Contract = top5Values.map((data) => data.type)
    const labels = top5Contract; // X-axis
    const dataPoints = top5ContractValue; // Y-axis
    const numericLabels = labels.filter(val => typeof val === 'number');
    const data = {
        labels,
        datasets: [
            {
                label: 'Contract Value',
                data: dataPoints,
                backgroundColor: '#B795EC',
                borderRadius: { topLeft: 20, topRight: 20, bottomLeft: 0, bottomRight: 0 },
                borderSkipped: false,
                barPercentage: 0.6,
                categoryPercentage: 0.5
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `$${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: value => '$' + value.toLocaleString()
                },
                title: {
                    display: true,
                    text: 'Contract Value'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Contract Type'
                }
            },

        }
    };
    return (
        <>
            {labels.length === 0 ? (
                <ErrorMsg>No data are present</ErrorMsg>
            ) : (
                <ChartContainer>
                    <Bar ref={chartRef} data={data} options={options} />
                </ChartContainer>
            )}
        </>
    );


}
