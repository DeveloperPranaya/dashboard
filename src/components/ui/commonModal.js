// components/CommonModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DownLoad from '../../assets/images/contractstack/download.png';
import {DownLoadIcon, ButtonContainer} from "../../style/dashboardStyle"

function CommonModal({
  show,
  handleClose,
  title = "Modal Title",
  children,
  footer = true,
  size = "lg",
  customClass = ""
}) {
  return (
    <Modal show={show} onHide={handleClose} size={size} className={customClass}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      {footer && (
        <Modal.Footer>
          <ButtonContainer style={{background:"white",color:"black", fontSize:"13px", fontWeight:"700" }} >
           <DownLoadIcon src={DownLoad} alt="download"/>
            Share
          </ButtonContainer>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default CommonModal;
