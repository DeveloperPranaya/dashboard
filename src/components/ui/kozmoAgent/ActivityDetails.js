import { useState, useEffect } from "react";
import userIcon from "../../../assets/images/kozmoAgent/boxicons-user.png";
import wrightIcon from "../../../assets/images/kozmoAgent/Chakra-Check.png";
import otherIcon from "../../../assets/images/kozmoAgent/anim Kozmo-Sparkle24.png";
import { GraphSkeleton } from "../../../style/ActivityDetailGraphStyle";
import { NotesSkeleton } from "../../../pages/skeleton";
import NoDataAvailable from "../NoDataAvailable";
import Button from "../Button";
import { ContainerDivision, Accordionbody, Headingcontainer, Container, Bordercontainer, ButtonContainer, DateContainer, ScrollArea, IntakeAgentDescription, ContractDescription, CommonDiv, CommonImage } from "../../../style/ActivityDetailsStyle";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",   // Friday
        year: "numeric",   // 2025
        month: "short",    // Jul
        day: "numeric",    // 4
    });
}


function ActivityDetails() {
    const [filterbar, setFilterbar] = useState("All");
    const [detailData, setDetailData] = useState([]);
    const [filteredData, setFilteredData] = useState(detailData || []);
    const [loading, setLoading] = useState(false);
    const [activeBtn, setActiveBtn] = useState("All")
    const completedData = detailData.filter((data) => { return data.status === "Completed" });
    const inProgress = detailData.filter((data) => { return data.status === "InProgress" });
    const escalations = detailData.filter((data) => { return data.status === "Escalations" });
    const buttonDetails = [{ name: "All", data: detailData.length }, { name: "Completed", data: completedData.length }, { name: "InProgress", data: inProgress.length }, { name: "Escalations", data: escalations.length }]

    const onClickHandel = (data) => {
        setFilterbar(data.replaceAll(" ", ""));
        setActiveBtn(data);
    };

    const groupedData = filteredData.reduce((acc, item) => {
        const date = item.date; // e.g. "2025-09-09"
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // fetching started
                const res = await fetch(`${API_BASE_URL}/Intake/details`);
                const data = await res.json();
                setDetailData(data);
            } catch (e) {
                console.error("error:", e);
            } finally {
                setLoading(false); // fetching ended
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = (detailData || [])
            .filter(item => filterbar === "All" || item?.status === filterbar)
            .sort((a, b) => new Date(b.Created) - new Date(a.Created));
        setFilteredData(filtered);
    }, [filterbar, detailData]);

    return (<Container>
        <ButtonContainer>
            {loading ? (<div style={{ display: "flex", gap: "10px" }}> <NotesSkeleton height="30px" width="10%" count={4} /></div>) :
                buttonDetails.map((value, key) => (
                    <Button
                        key={key}
                        children={value.name}
                        activeDetail={activeBtn === value.name}
                        onClick={() => onClickHandel(value.name)}
                        totaldata={value.data}
                    />
                ))
            }
        </ButtonContainer>

        <Bordercontainer />
        {loading ? (<div style={{ padding: "16px" }}>
            <GraphSkeleton height="100px" />
            <GraphSkeleton height="100px" />
            <GraphSkeleton height="100px" />
            <GraphSkeleton height="100px" />
            <GraphSkeleton height="100px" />
        </div>) :filteredData.length === 0 ? (
  <NoDataAvailable />
)
        :
            <IntakeAgentDescription>
                <ScrollArea>
                    {Object.entries(groupedData).map(([date, items]) => (
                        <div key={date} style={{ marginBottom: "16px" }}>
                            <DateContainer paddingTop="8px" paddingBottom="8px"  className="sticky-date">{formatDate(date)}</DateContainer>
                            {items.map((item, index) => (
                                <ContractDescription key={item.id}>
                                    <div className="accordion mb-2 " id={`accordion-${index}`}>
                                        <div className="accordion-item ai-agent-accordian">
                                            <h2 className="accordion-header" id={`heading-${index}`}>
                                                <button
                                                    className="accordion-button collapsed "
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse-${index}`}
                                                    aria-expanded="false"
                                                    aria-controls={`collapse-${index}`}
                                                >
                                                    <div>
                                                        <DateContainer fontWeight="500">{item.fileName}</DateContainer>
                                                        <CommonDiv status={item.status}>
                                                            <CommonImage src={item.status === "Completed" ? wrightIcon : item.status === "InProgress" ? userIcon : otherIcon} alt="img" />
                                                            {item.outcomeSummary}
                                                        </CommonDiv>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse-${index}`}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`heading-${index}`}
                                                data-bs-parent={`#accordion-${index}`}
                                            >
                                                <div className="accordion-body">
                                                    <Accordionbody>
                                                        <ContainerDivision>
                                                            <Headingcontainer>File Source</Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                The document was successfully uploaded and added to system.
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Source: Inbox Request ID: {item.requestId}
                                                            </Headingcontainer>
                                                        </ContainerDivision>
                                                        <ContainerDivision>
                                                            <Headingcontainer>Document Classification</Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                The document was analyzed and classified as '{item.documentType}'.
                                                            </Headingcontainer>
                                                        </ContainerDivision>
                                                        <ContainerDivision>
                                                            <Headingcontainer>Metadata Extraction</Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>

                                                            <Headingcontainer fontWeight="500">
                                                                Key contract information was extracted:
                                                            </Headingcontainer>

                                                            <Headingcontainer fontWeight="500">
                                                                Effective Date
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>
                                                        </ContainerDivision>
                                                        <ContainerDivision>
                                                            <Headingcontainer>Contract Record Setup Initiated</Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                A new contract record setup process was started for this document.
                                                            </Headingcontainer>
                                                        </ContainerDivision>
                                                        <ContainerDivision>
                                                            <Headingcontainer>Business Area Assignment</Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                               The document was routed to the {item.businessArea} based on classification and metadata.
                                                            </Headingcontainer>
                                                        </ContainerDivision>
                                                        <ContainerDivision>
                                                            <Headingcontainer>Counterparty Verification</Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                               The document was routed to the {item.businessArea} based on classification and metadata.
                                                            </Headingcontainer>
                                                        </ContainerDivision>
                                                        <ContainerDivision>
                                                             <Headingcontainer>Contract Record Created</Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                                Date:  {item.dateTime}
                                                            </Headingcontainer>
                                                            <Headingcontainer fontWeight="500">
                                                               The contract record {item.businessArea} based on classification and metadata.
                                                            </Headingcontainer>
                                                        </ContainerDivision>                                         
                                                    </Accordionbody>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ContractDescription>
                            ))}

                        </div>
                    ))}
                </ScrollArea>
            </IntakeAgentDescription>
        }
    </Container>
    );
}

export default ActivityDetails;