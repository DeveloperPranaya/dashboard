import { Link } from "react-router-dom";
import vectorImg from "../assets/images/topnavbar/Vector.png";
import leftIcon from "../assets/images/topnavbar/leftIcon.png";
import settingIcon from "../assets/images/topnavbar/settings.png";
import { redirectToeContract } from "../mockdata/mockdata";
import Tooltip from "../components/ui/tooltip";
import DashboardSetting from "./DashboardSetting";
import CommonNavbar from "../components/ui/CommonNavbar";
import { VectorImg } from "../style/navbarStyle";

function Navbar({ cardContainer, dropdownDataset }) {
  return (
    <CommonNavbar
      leftLink={redirectToeContract}
      centerIcon={vectorImg}
      centerText="Kozmo Dashboard"
      rightContent={({ setShowModal }) => (
        <>
           {/* <Link to="/intake-agent">Kozmo Intake Agent</Link> */}
          <Tooltip text="Dashboard Setting" position="left">
             <VectorImg
              src={settingIcon}
              alt="setting"
              onClick={() => setShowModal(true)}
            />
          </Tooltip>
        </>
      )}
      modalTitle="Kozmo Dashboard Setting"
      modalBody={({ setShowModal }) => (
        <DashboardSetting handleClose={() => setShowModal(false)} cardContainer={cardContainer} dropdownDataset={dropdownDataset}/>
      )}
    />
  );
}

export default Navbar;

