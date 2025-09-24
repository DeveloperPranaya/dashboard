
import { CardContainer, StyledCard, Title, Number, Label } from "../../style/cardStyle";
import ProgressRing from "./ProgressRing";
import Tooltip from "./tooltip";

const Card = ({ carddata, onCardClick, selectCard }) => {
  if (!carddata) return <div>No data</div>;

  return (
    <CardContainer>
      {Object.entries(carddata).map(([key, values]) => {
        const cleanTitle = key.replace('Renewals Breakdown ', '');
        const number = values.count;
        const isactive = key === selectCard;
        const total = Object.values(carddata).reduce((sum, val) => sum + val.count, 0);
        return (
          <StyledCard
            key={key}
            $isActive={isactive}
            onClick={() => onCardClick(key)}
          >
            <div>
              <Title>{cleanTitle}</Title>
               <Tooltip text='Number of Contracts'>
                      <Number>{number}</Number>
               </Tooltip>
              <Label>Contracts</Label>
            </div>

            <ProgressRing percentage={Math.round((number / total) * 100)} />
          </StyledCard>
        );
      })}
    </CardContainer>
  );
};

export default Card;

