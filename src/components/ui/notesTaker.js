import Button from "./Button";
import closeButton from "../../assets/images/navbar/closeButton.png";
import { useDispatch } from 'react-redux';
import { deleteNotes } from "../../redux/noteSlice";
import { ToastContainer, toast } from 'react-toastify';

function NotesTaker({ setFetchNoteData, fetchNoteData, setNotesText, validation, setValidation, contractRowKey, handleSubmit, setToggle, noteText }) {
    const dispatch = useDispatch();
    const onCloseHandle = async (contractId, rowKey) => {
        try {
            await dispatch(deleteNotes({ contractId, rowKey })).unwrap();
            // Filter out the deleted note from the local list
            const updatedNotes = fetchNoteData.filter(note => note.rowKey !== rowKey);
            setFetchNoteData(updatedNotes); // Call setState from parent
            toast.success("✅ Notes Removed");
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (<>
        <div className='notes'>
            <textarea id="w3review" name="w3review" placeholder='Add Note' value={noteText}
                onChange={(e) => { setNotesText(e.target.value); if (validation) setValidation(""); }} />
            {validation && <div className="error">{validation}</div>}
            <div className='notify-div'>Notify</div>
            <div className='notify-container'>
                {fetchNoteData && fetchNoteData.map((value, key) => {
                    const { contractId, rowKey, note } = value;
                    return (
                        <div className="not" id={key}>
                            <div className="notify-data">
                                {note}
                                <img src={closeButton} alt="close" className="clsBtn" onClick={() => onCloseHandle(contractId, rowKey)} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='notify-btn'>
                <Button
                    iconOnly
                    active={false}
                    bgColor="#F1F1F2"
                    width="83px"
                    height="32px"
                    padding="1rem"
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
                    onClick={() => setToggle(false)}
                >
                    Cancel
                </Button>
            </div>
        </div>
        <ToastContainer
                toastClassName="toast-custom"
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
        </>
    );
}

export default NotesTaker;