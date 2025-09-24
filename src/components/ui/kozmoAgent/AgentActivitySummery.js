import { useState, useEffect } from "react";
import Completed from "../../../assets/images/kozmoAgent/completed.png"
import Inprogress from "../../../assets/images/kozmoAgent/inprogress.png"
import Escalations from "../../../assets/images/kozmoAgent/escalations.png";
import { NotesSkeleton } from "../../../pages/skeleton";
import { Container, Heading, SummeryContainer, SummerBox, Image, Status, Amount } from "../../../style/AgentActivitySummeryStyle";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

function InformationBox({icon, data, status}) {

    return (
        <SummeryContainer variant="completed">
            <Image src={icon} alt="Completed" />
            <Amount>{data}</Amount>
            <Status>{status}</Status>
        </SummeryContainer>
    );
}
function AgentActivitySummery() {
    const [summeryDetail, setSummeryDetail] = useState({}   );
    const {completedTasks, inProgressTasks, escalations} = summeryDetail;
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // fetching started
                const res = await fetch(`${API_BASE_URL}/Intake/summary`);
                const data = await res.json();
                setSummeryDetail(data);
            } catch (e) {
                console.error("error:", e);
            } finally {
                setLoading(false); // fetching ended
            }
        };

        fetchData();
    }, []); // ✅ run only once

    return (
        <Container>
            <Heading>Agent Activity Summery (Last 48 hours)</Heading>

            {loading  ? (
                <div style={{ display: "flex", gap: "10px" }}> <NotesSkeleton height="60px" width="100%" count={3} /></div>
            ) : (
                summeryDetail &&
               
                    <SummerBox>
                        <InformationBox icon={Completed} data={completedTasks} status="Completed"/>
                        <InformationBox icon={Inprogress} data={inProgressTasks} status="In Progress"/>
                        <InformationBox icon={Escalations} data={escalations} status="Escalations"/>
                    </SummerBox>
                
            )}
        </Container>
    );
}

export default AgentActivitySummery;