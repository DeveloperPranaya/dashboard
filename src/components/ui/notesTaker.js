import { useEffect} from "react"
import Button from "./Button";
import styled from "styled-components";

// Styled components
const NotifyContainer = styled.div`
  max-height: 200px; /* limit height of notify section */
  overflow-y: auto; /* scrollbar if more notes */
  padding-right: 5px;

  /* custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const NoteItem = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoteText = styled.div`
  max-width: 220px; /* control text width inside box */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer; /* for hover */
`;
const Container = styled.div`
top:64px;
  position: relative; /* Important! Makes absolute children relative to this container */
`;

function NotesTaker({
  setNotesText,
  validation,
  setValidation,
  contractRowKey,
  handleSubmit,
  setToggle,
  noteText,
  submitting,
   setSelectedOptions,
}) {
  
  const onCloseButton = () => {
    setToggle(false);
    setValidation("");
    setNotesText("");
  }

  useEffect(() => {
    setNotesText("");   // clear textarea
    setValidation(""); 
    setSelectedOptions([]) // reset validation
    // setFetchNoteData([]); // clear notes instantly ⚡
  }, [contractRowKey]);

  return (
    <Container>
      <div className="notes">
        <textarea
          id="w3review"
          name="w3review"
          placeholder="Add Note"
          value={noteText}
          onChange={(e) => {
            setNotesText(e.target.value);
            if (validation) setValidation("");
          }}
        />
        {validation && <div className="error">{validation}</div>}
        {/* <div className="notify-div">Notify</div> */}

        {/* <MultiSelectDropDown setFetchNoteData={setFetchNoteData} selectedOptions={selectedOptions} options={options} width="92%" height= "40%" notesTaker handleOptionClick={handleOptionClick}/> */}

        <div className="notify-btn" style={{marginTop:"47px"}}>
          <Button
            // zIndex={500}
            iconOnly
            active={false}
            bgColor="#F1F1F2"
            width="83px"
            height="32px"
            padding="1rem"
            disabled={submitting}
            onClick={handleSubmit}
            id={contractRowKey}
          >
            Add
          </Button>
          <Button
            iconOnly
            active={false}
            bgColor="#F1F1F2"
            width="83px"
            height="32px"
            padding="1rem"
            onClick={onCloseButton}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default NotesTaker;
