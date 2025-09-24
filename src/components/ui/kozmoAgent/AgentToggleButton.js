import { useState } from "react";
import { togglebuttonName } from "../../../mockdata/mockdata";
import { Container, ToggleBtn, ToggleBtnContainer } from "../../../style/AgentToggleButtonStyle"

function AgentToggleButton({activeId, setActiveId}) {
   // default: Overview active

    return (
        <Container>
            <ToggleBtnContainer>
            {togglebuttonName.map((item) => {
                const isActive = activeId === item.id;

                return (
                    <ToggleBtn
                        key={item.id}
                        isActive={activeId === item.id}   // pass the prop
                        onClick={() => setActiveId(item.id)}
                    >
                      {item.name}   
                    </ToggleBtn>
                );
            })}
            </ToggleBtnContainer>
        </Container>
    );
}

export default AgentToggleButton;
