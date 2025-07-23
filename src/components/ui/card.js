
import {CardContainer, StyledCard, Title, Number, Label, ProgressRing } from "../../style/cardStyle"
const Card = ({ carddata, onCardClick, selectCard }) => {
  if (!carddata) return <div>No data</div>;

  return (
    <CardContainer>
      {Object.entries(carddata).map(([key, values]) => {
        const cleanTitle = key.replace('Renewals Breakdown ', '');
        const number = values.count;
        const isActive = key === selectCard;

        return (
          <StyledCard
            key={key}
            isActive={isActive}
            onClick={() => onCardClick(key)}
          >
            <Title>{cleanTitle}</Title>
            <Number>{number}</Number>
            <Label>Contracts</Label>
            <ProgressRing />
          </StyledCard>
        );
      })}
    </CardContainer>
  );
};

export default Card;

