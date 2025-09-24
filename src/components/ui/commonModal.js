import Modal from 'react-bootstrap/Modal';
import { ButtonContainer } from "../../style/dashboardStyle"


function CommonModal({
  show,
  handleClose,
  title = "Modal Title",
  children,
  footer = true,
  size = "lg",
  customClass = "",
  fullscreen = false,
  dashboardSetting,
  bodyStyle = {} 
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={fullscreen ? undefined : size} 
      fullscreen={fullscreen}
      className={customClass}
    >
    {!dashboardSetting &&  <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "18px" }}>{title}</Modal.Title>
      </Modal.Header> }  
      

      <Modal.Body style={bodyStyle}>{children}</Modal.Body>

      {!dashboardSetting && footer && (
        <Modal.Footer>
          <ButtonContainer
            dynamicBackground="white"
            dynamicColor="black"
            dynamicFontSize="14px"
            dynamicFontWeight="600"
            onClick={handleClose}
          >
            Cancel
          </ButtonContainer>
         
        </Modal.Footer>
      )}
    </Modal>
  );
}


export default CommonModal;
