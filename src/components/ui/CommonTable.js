import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import notesIcon from "../../assets/images/navbar/notesIcon.svg";
import statusIcon from "../../assets/images/navbar/statusIcon.svg";
import aiIcon from "../../assets/images/navbar/aiIcon.svg";
import bookmark from "../../assets/images/navbar/bookmark.svg"
import NotesTaker from './notesTaker';
import Button from '../../components/ui/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, fetchNotesData } from '../../redux/noteSlice';
import { addBookMark, fetchBookMark, deleteBookMark } from "../../redux/bookmarkSlice";
import { TdTitle, TdCounterparty } from "../../style/tableStyle";
import CommonModal from './commonModal';
import { isBookmarked } from "./commonfunction"
import Pagination from './Pagination';
import Tooltip from './tooltip';
import AiSummary from './AiSummary';
import "../../style/table.css";

function CommonTable({ headers, data, selectCard, renderCell, renewalType }) {
  const dispatch = useDispatch();
  const { response } = useSelector(
    (state) => state.bookMark
  );
  const { bookMarks = [] } = useSelector(state => state.bookMark)
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [noteText, setNotesText] = useState('');
  const [validation, setValidation] = useState();
  const [contractId, setContractId] = useState();
  const [createdBy, setCreatedBy] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fetchNoteData, setFetchNoteData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  let newContractId = response?.contractId ?? "";
  if (response) {
    const { message, noteId, contractId } = response;
    newContractId = contractId;
  }

  const clickHandel = (key) => {
    setContractId(key)
    setCreatedBy('')
    setToggle(!toggle)
    dispatch(fetchNotesData({ contractId: key }))
      .unwrap()
      .then(data => {
        setFetchNoteData(data)
        console.log("data:-", data)
      })
      .catch(err => {
        toast.error(`❌ ${err}`);
      });
  }

  const clickBookMark = async (contractRowKey, contractTitle) => {
    const alreadyBookmarked = bookMarks.some(b => b.objectID === contractRowKey);

    try {
      if (alreadyBookmarked) {
        // Remove bookmark
        await dispatch(deleteBookMark({ contractId: contractRowKey, userId: "" })).unwrap();
        toast.success("✅ Bookmark removed");
      } else {
        // Add new bookmark
        await dispatch(
          addBookMark({
            contractID: contractRowKey,
            contractTitle,
            userID: ""
          })
        ).unwrap();
        toast.success("✅ Successfully bookmarked");
      }
      // Immediately refresh the bookmarks list after any change
      dispatch(fetchBookMark());
    } catch (err) {
      toast.error(`❌ ${err.message || 'Operation failed'}`);
    }
  };

  const handleSubmit = () => {
    if (!noteText) {
      setValidation('Please add a Note');
      return;
    }
    dispatch(addNote({ contractID: contractId, note: noteText, createdBy }))
      .unwrap()
      .then(data => {
        toast.success('✅ Note submitted!');
        setNotesText('');
        setToggle(false)
      })
      .catch(err => {
        toast.error(`❌ ${err}`);
      });
  };

  useEffect(() => {
    dispatch(fetchBookMark())
  }, [dispatch])

  useEffect(() => {
    setCurrentPage(1);
  }, [data, selectCard]);

  const totalItems = data && data[selectCard]?.details?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = data && data[selectCard]?.details?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  return (
    <>
      <div className="table-container">
        <table className="contract-table">
          <thead>
            <tr>
              {headers && headers.map(h => (
                <th key={h.id} className={h.className}>{h.label}</th>
              ))}
            </tr>
          </thead>
          {renewalType ?
            <tbody>
              {renewalType.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.month}</td>
                  <td>{row.AutoRenew}</td>
                  <td>{row.ManualRenew}</td>
                  <td>{row.OneTimeRenew}</td>
                </tr>
              ))}
            </tbody>

            :
            <tbody>
              {paginatedData && (paginatedData).map((item, index) => {
                const contractTitle = item["Contracts.ContractTitle"];
                const counterparty = item["Contracts.Counterparty"];
                const renewalType = item['Contracts.AutoRenew'];
                const contractValue = item['Contracts.ContractValue'];
                const endDateRaw = item["Contracts.EndDate"];
                const contractsRawKey = item["Contracts.RowKey"]
                let displayValue = '-';
                if (endDateRaw) {
                  const end = new Date(endDateRaw);
                  const today = new Date();
                  const diff = end - today;
                  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                  displayValue = days >= 0 ? `${days}` : 0;
                }

                return (<> <tr key={index}>
                  <td class="col-checkbox">
                    <Tooltip text="Bookmark">
                      <img
                        src={bookmark}
                        className={`bookmark-image${isBookmarked(contractsRawKey, bookMarks) ? " active-bookmark" : ""}`}
                        onClick={() => clickBookMark(contractsRawKey, contractTitle)}
                      />
                    </Tooltip>

                  </td>
                  <TdTitle>{contractTitle ? contractTitle : '-'}</TdTitle>
                  <td>{counterparty ? counterparty : '-'}</td>
                  <td>{renewalType ? renewalType : '-'}</td>
                  <td> {contractValue ? `$ ${contractValue}` : '-'}</td>
                  <td>{displayValue}</td>
                  <td>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <Tooltip text="Add Notes">
                        <Button
                          iconOnly
                          active={false}
                          bgColor="#F1F1F2"
                          width="10px"
                          height="10px"
                          padding="1rem"
                          onClick={() => clickHandel(contractsRawKey)}
                        >
                          <img src={notesIcon} alt="Chart" className="bookmark-image" />
                        </Button>
                      </Tooltip>
                      {toggle ? <NotesTaker setFetchNoteData={setFetchNoteData} fetchNoteData={fetchNoteData} setNotesText={setNotesText} noteText={noteText} validation={validation} setValidation={setValidation} handleSubmit={handleSubmit} contractRowKey={contractsRawKey} setToggle={setToggle} /> : ""}
                      {/* <Tooltip text="Add Status">
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
                      </Tooltip> */}


                      <CommonModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        title={`${contractTitle} summery`}
                        size="xl"
                        customClass="custom-width-modal"
                      >
                        <AiSummary contractData={{
                          contractType: item['Contracts.ContractType'],
                          businessArea: item['Contracts.BusinessArea'],
                          contractValue: item['Contracts.ContractValue'],
                          status: item['Contracts.Status'],
                          autoRenew: item['Contracts.AutoRenew'],
                          endDate: endDateRaw,
                          counterparty: counterparty,
                        }} />

                        {/* <div className="summary-details">
                            <p><strong>Contract Type: </strong>{item['Contracts.ContractType']}</p>
                            <p><strong>Business Area: </strong> {item['Contracts.BusinessArea']}</p>
                             <p><strong>Value:</strong>{item['Contracts.ContractValue']}</p> 
                            <p><strong>Status:</strong>  {item['Contracts.Status']}</p> 
                             <p><strong>Auto-Renewal:</strong> {item['Contracts.AutoRenew']}</p> 
                            <p><strong>End Date: </strong> {new Date(endDateRaw).toLocaleDateString()}</p>
                            <p><strong>Counterparty:</strong> {counterparty}</p>
                           
                    </div> */}




                      </CommonModal>
                      <Tooltip text="AI Summary">
                        <Button
                          iconOnly
                          active={false}
                          bgColor="#F1F1F2"
                          width="10px"
                          height="10px"
                          padding="1rem"
                          onClick={() => setShowModal(true)}
                        >
                          <img src={aiIcon} className="bookmark-image" alt="Status" />
                        </Button>
                      </Tooltip>
                    </div>
                  </td >
                </tr>

                </>
                )
              })}
            </tbody>
          }
        </table >
      </div >

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
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

export default CommonTable;
