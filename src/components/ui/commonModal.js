import Modal from 'react-bootstrap/Modal';
import { ButtonContainer } from "../../style/dashboardStyle";
import "../../style/CommonModal.css";
import Pagination from './Pagination';

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
  bodyStyle = {},
  showSearch = false,
  onSearchChange,
  fromContractView,
  subTitle,
  pagination = false,
  currentPage,
  totalPages,
  onPageChange,
  counterPartyData,
  counterPartyType
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={fullscreen ? undefined : size}
      fullscreen={fullscreen}
      className={customClass}
    >
      {!dashboardSetting && (
        <Modal.Header closeButton>
          <Modal.Title className='modalheader'>{title}</Modal.Title>
        </Modal.Header>
      )}

      {/* ✅ Optional Search Header */}
      {(showSearch || fromContractView) && (
        <div className="modal-search-header px-3 py-2 border-bottom inbetween-item">
          <div>{subTitle}</div>
          {/* <input
            type="text"
            placeholder={counterPartyData? "Search by CounterParty Name":"Search by Contract Title"}
            className="form-control"
            onChange={(e) => onSearchChange?.(e.target.value)}
          /> */}
        </div>
      )}

      <Modal.Body style={bodyStyle}>{children}</Modal.Body>

      {!fromContractView && !pagination && !dashboardSetting && footer && (
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
