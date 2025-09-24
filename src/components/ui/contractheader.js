import { ContractHeading, HedaerContainer, Iimage } from "../../style/contractheading";
import InformationDescription from "./InformationDescription";
import CommonDropdown from "./CommonDropDown";
import ToggleButton from "./togglebutton";

function ContractHeader({ heading, visibleButtons, view, setView, obligation, selectedDropdown, onChange, globalRenewal, desc = " " }) {

    return (
        <HedaerContainer>
            
                <div className="center-item">
                   <ContractHeading obligation={obligation}>{heading}</ContractHeading>
                   < InformationDescription title={desc}/>
                </div>  
           
            <div className="center-item">
                {selectedDropdown === "Global-Dashboard" && <div>
                    {/* <CommonDropdown
                        $dynamicBackground="#ffffff"
                        $dynamicBorder="1px solid #E7E7E8"
                        dynamicFont="14px"
                        dynamicBackgrounddynamicweidht="400"
                        label="Choose Framework"
                        options={globalRenewal}
                        onChange={onChange}
                        name="framework"
                    /> */}
                </div>
                }
                {!obligation && <ToggleButton visibleButtons={visibleButtons} view={view} setView={setView} />}
            </div>

        </HedaerContainer>
    )
}

export default ContractHeader;