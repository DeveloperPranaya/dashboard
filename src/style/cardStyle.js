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
  width: 318px;
  height: 126px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
  border: 1px solid ${({ isActive }) => (isActive ? '#7434DB' : '#ddd')};
  cursor: pointer;
  transition: border 0.3s;
  &:hover {
    border: 1px solid #7434DB;
  }

  @media (max-width: 1400px) {
    width: 251px;
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

export const ProgressRing = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: 4px solid #eee;
  border-top-color: #8952E0;
  border-radius: 50%;
  transform: rotate(45deg);
`;
