import { useState, useEffect } from "react";
import { Container, GrapherHeading, GraphSkeleton } from "../../../style/ActivityDetailGraphStyle";
import { HorizontalBarChart } from "../CommonHorizontalBarChart";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

function ActivityDetailGraph() {
    const [graphDetail, setGraphDetail] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // fetching started
                const res = await fetch(
                    `${API_BASE_URL}/Intake/trend`
                );
                const data = await res.json();
                setGraphDetail(data);

                // 🔹 Build labels + datasets here after data is ready
                const labels = data.map(item =>
                    new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                    })
                );

                const datasets = [
                    {
                        label: "Completed",
                        data: data.map(item => item.completedTasks),
                        backgroundColor: "#7434DB",
                    },
                    {
                        label: "In Progress",
                        data: data.map(item => item.inProgressTasks),
                        backgroundColor: "#A379E7",
                    },
                    {
                        label: "Escalations",
                        data: data.map(item => item.escalations),
                        backgroundColor: "#B795EC",
                    },
                ];

                setChartData({
                    data: { labels, datasets },
                    options: {
                        // indexAxis: "y", // horizontal bars
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                            title: {
                                display: true,
                                text: "Agent Task Summary (Last 10 Days)",
                            },
                        },
                        scales: {
                            x: {
                                stacked: true,
                                title: {
                                    display: true,
                                    text: "Date",   // 👈 X-axis label
                                    font: { size: 14, weight: "bold" },
                                    color: "#000"
                                }
                            },
                            y: {
                                stacked: true,
                                title: {
                                    display: true,
                                    text: "Number of Tasks",   // 👈 Y-axis label
                                    font: { size: 14, weight: "bold" },
                                    color: "#000"
                                }
                            },
                        },
                        ticks: {
                            color: "#000",   // ✅ Y-axis values in black
                        },
                    },
                });
            } catch (e) {
                console.error("error:", e);
            } finally {
                setLoading(false); // fetching ended
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <GrapherHeading>Contract Intake Agent - Activity Trend</GrapherHeading>
            {loading && <GraphSkeleton />}
            {!loading && chartData && (
                <HorizontalBarChart data={chartData.data} options={chartData.options} />
            )}
        </Container>
    );
}

export default ActivityDetailGraph;
