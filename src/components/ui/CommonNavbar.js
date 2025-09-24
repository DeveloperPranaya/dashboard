import { useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "../ui/tooltip";
import CommonModal from "../ui/commonModal";
import {
  NavbarContainer,
  EContractText,
  CenterContainer,
  Spacer,
  LeftIconImg,
  VectorImg,
  KozmoAgent
} from "../../style/navbarStyle";

function CommonNavbar({
  leftLink,
  centerIcon,
  centerText,
  rightContent,
  modalTitle,
  modalBody,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <NavbarContainer>
      {/* Center Section */}
      <CenterContainer>
        {centerIcon && <VectorImg src={centerIcon} alt="center-icon" />}
        {centerText}
      </CenterContainer>

      {/* Right Section */}
      <KozmoAgent>
        {rightContent &&
          rightContent({ setShowModal }) /* callback for flexible content */}
      </KozmoAgent>

      {/* Modal */}
      {modalTitle && modalBody && (
        <CommonModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          title={modalTitle}
          customClass="setting-modal"
          fullscreen
          dashboardSetting
          bodyStyle={{
            backgroundColor: "#E5DAF8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {modalBody({ setShowModal })}
        </CommonModal>
      )}
    </NavbarContainer>
  );
}

export default CommonNavbar;
