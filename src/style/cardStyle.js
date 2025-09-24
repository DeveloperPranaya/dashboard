import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  gap: 21px;
  flex-wrap: wrap;
`;

export const StyledCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 23.68%;
  height: 126px;
  text-align: left;
  position: relative;
  border: 1px solid ${({ $isActive }) => ($isActive ? '#7434DB' : '#ddd')};
  cursor: pointer;
  transition: border 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    border: 1px solid #7434DB;
  }

  @media (max-width: 1400px) {
    min-width: 23.68%;
    padding: 12px 16px;
  }
  @media (min-width: 1200px) and (max-width: 1259px) {
  min-width: 22.68%;
  padding: 12px 16px;
}
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1D2025;
  margin-bottom: 8px;
  line-height: 14px;
`;

export const Number = styled.div`
  font-size: 36px;
  font-weight: 700;
  line-height: 120%;
  margin-bottom: 4px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  color: #52555A;
`;


