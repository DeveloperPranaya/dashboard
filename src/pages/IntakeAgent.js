import CommonNavbar from "../components/ui/CommonNavbar";
import vectorImg from "../assets/images/topnavbar/Vector.png";
import leftIcon from "../assets/images/topnavbar/leftIcon.png";
import {dashoboardLink} from "../mockdata/mockdata"
import AgentDashboard from "../layouts/AgentDashboard";


export default function IntakeAgent() {
    return (
        <>
            <CommonNavbar
                leftIcon={leftIcon}
                leftText="Back to Dashboard"
                centerIcon={vectorImg}
                leftLink={dashoboardLink}
                centerText="Kozmo Intake Agent"
            />
            <AgentDashboard/>
        </>
    );
}
