import icon from "../../assets/images/header/icon.png";
import { Iimage } from "../../style/contractheading";
import TooltipWrapper from "./TooltipWrapper";

function InformationDescription({title}) {
    return (<>
        <TooltipWrapper title={title} placement="top" customClass="my-tooltip">
            <Iimage src={icon} alt="icon" />
        </TooltipWrapper>
    </>)
}

export default InformationDescription;