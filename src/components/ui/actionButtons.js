
import Button from "./Button";

function ActionButtons() {
    
    return (
        <div style={{ display: "flex", gap: "2px" }}>
            <Button
                iconOnly
                active={false}
                bgColor="#F1F1F2"
                width="10px"
                height="10px"
                padding="1rem"
                onClick={() => clickHandel(contractRowKey)}
            >
                <img src={notesIcon} alt="Chart" className="graphicon" />
            </Button>
            {toggle ? <NotesTaker setNotesText={setNotesText} noteText={noteText} validation={validation} setValidation={setValidation} handleSubmit={handleSubmit} contractRowKey={contractRowKey} setToggle={setToggle} /> : ""}
            <Button
                iconOnly
                active={false}
                bgColor="#F1F1F2"
                width="10px"
                height="10px"
                padding="1rem"
            >
                <img src={statusIcon} className="bookmark-image" alt="Notes" />
            </Button>
            <Button
                iconOnly
                active={false}
                bgColor="#F1F1F2"
                width="10px"
                height="10px"
                padding="1rem"
            >
                <img src={aiIcon} className="bookmark-image" alt="Status" />
            </Button>
        </div>);
}

        export default ActionButtons