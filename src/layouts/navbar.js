import React from 'react';
import vectorImg from "../assets/images/topnavbar/Vector.png";
import leftIcon from "../assets/images/topnavbar/leftIcon.png";
import {
  NavbarContainer,
  EContractText,
  CenterContainer,
  Spacer,
  LeftIconImg,
  VectorImg
} from '../style/navbarStyle';

function Navbar() {
  return (
    <NavbarContainer>
      <EContractText>
        <LeftIconImg src={leftIcon} alt="left-icon" />
        Back to eContracts
      </EContractText>

      <CenterContainer>
        <VectorImg src={vectorImg} alt="vector" />
        Kozmo Dashboard
      </CenterContainer>

      <Spacer />
    </NavbarContainer>
  );
}

export default Navbar;
