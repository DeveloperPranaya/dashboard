import { useEffect, useState, lazy, Suspense } from 'react';

// Lazy load the Dashboard component
const Dashboard = lazy(() => import("./dashboard/dashboard"));

function KozmoDashboard() {
    const [rowKey, setRowKey] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Get query parameters from URL
        const params = new URLSearchParams(window.location.search);
        const rowKeyParam = params.get("rowKey");
        const userNameParam = params.get("userName");

        if (rowKeyParam) setRowKey(rowKeyParam);
        if (userNameParam) setUserName(userNameParam);
    }, []);

    return (
        <div style={{ width: "100%", backgroundColor: "#F9F6FD" }}>
            <Suspense fallback={<div>Loading dashboard...</div>}>
                <Dashboard rowKey={rowKey} userName={userName} />
            </Suspense>
        </div>
    );
}

export default KozmoDashboard;
