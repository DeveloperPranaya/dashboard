import {ContractMain, ContractHeading, HedaerContainer} from "../../style/contractheading";
import ToggleButton from "./togglebutton";

function ContractHeader({heading, visibleButtons, view, setView, obligation }){
    return(
        // <div className={"inbetween-item"} style={{marginBottom:"16px"}}>
        <HedaerContainer>
             <ContractHeading obligation={obligation}>{heading}</ContractHeading>
            {!obligation && <ToggleButton visibleButtons={visibleButtons} view={view} setView={setView}/>}
        </HedaerContainer>
        // </div>
    )
}

export default ContractHeader;