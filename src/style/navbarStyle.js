import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: #E5DAF8;
  padding: 15.5px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 20;
`;

export const CenterContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
`;

export const EContractText = styled.div`
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  display: flex;
  align-items: center;
`;

export const Spacer = styled.div`
  width: 120px;
`;

export const LeftIconImg = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  cursor: pointer;
`;

export const VectorImg = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`;
