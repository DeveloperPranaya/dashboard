import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import notesIcon from "../../assets/images/navbar/notesIcon.svg";
import aiIcon from "../../assets/images/navbar/aiIcon.svg";
import NotesTaker from './notesTaker';
import Button from '../../components/ui/Button';
import { addNote, fetchNotesData } from '../../redux/noteSlice';
import { fetchBookMark } from "../../redux/bookmarkSlice";
import BookmarkButton from './BookMark';
import TableHeader from './TableHeder';
import OverflowTooltip from './OverflowTooltip';
import CommonModal from './commonModal';
import Pagination from './Pagination';
import Tooltip from './tooltip';
import AiSummary from './AiSummary';
import NoDataAvailable from './NoDataAvailable';
import "../../style/table.css";

function CommonTable({ data, selectCard, renewalType, setToggle, toggle }) {
  const searchParams = new URLSearchParams(window.location.search);
  const urlBusinessArea = searchParams.get("businessArea");
  const businessAreas = useSelector(
    (state) =>  state?.dropDown?.data?.businessAreas?.businessAreas
  );

  const test1 = useSelector(
    (state) =>  state?.dropDown?.data
  );
 
  const dispatch = useDispatch();
  const test =
  businessAreas?.businessAreas?.length > 0
    ? businessAreas.businessArea
    : businessAreas?.businessAreaContribute?.length > 0
    ? businessAreas.businessAreaContribute
    : businessAreas?.businessAreaRead?.length > 0
    ? businessAreas.businessAreaRead
    : businessAreas?.ownerOfBusinessAreas?.length > 0
    ? businessAreas.ownerOfBusinessAreas
    : [];
 
  const dropdownDataFull = useSelector(
    (state) => state?.dropDown?.data?.businessAreas?.businessAreas
  );

  const notesDropdown = useSelector(
  (state) =>
    state?.dropDown?.data?.user?.users ??
    state?.dropDown?.data?.user?.userNames ??
    []
);


  const notesOptions = notesDropdown.map(name => ({
    value: name,
    label: name,
    isActive: "true"
  }));


  const dropdownData =
  test && Object.keys(test).length > 0 ? test : dropdownDataFull;
  
  const options = dropdownData.map(name => ({
    value: name,
    label: name,
    isActive: "true"
  }));
  const [selectedOptions, setSelectedOptions] = useState([]);
  const sendto = selectedOptions.join(";");
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toggleRow, setToggleRow] = useState();
  const [modalContractId, setModalContractId] = useState(null);
  const [noteText, setNotesText] = useState('');
  const [validation, setValidation] = useState();
  const [contractId, setContractId] = useState();
  const [createdBy, setCreatedBy] = useState('');
  const [fetchNoteData, setFetchNoteData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const ITEMS_PER_PAGE = 7;

  const handleOptionClick = (value) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) // remove if already selected
        : [...prev, value] // add if not selected
    );
  };


  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const clickHandel = (key) => {
    setContractId(key)
    setCreatedBy('')
    setToggle(!toggle)
    setToggleRow(key);

    setLoadingNotes(true);

    dispatch(fetchNotesData({ contractId: key }))
      .unwrap()
      .then(data => {
        setFetchNoteData(data)
      })
      .catch(err => {
        toast.error(`❌ ${err}`);
      })
      .finally(() => {
        setLoadingNotes(false);
      })
  }

  const handleSubmit = () => {
    if (!noteText) {
      setValidation('Please add a Note');
      return;
    }

    if (submitting) return; // prevent multiple clicks
    setSubmitting(true);

    const searchParams = new URLSearchParams(window.location.search);
    const userName = searchParams.get("userName");

    dispatch(addNote({
      contractID: contractId,
      note: noteText,
      createdBy: userName,
      SendTo: sendto
    }))
      .unwrap()
      .then(data => {
        toast.success('✅ Note submitted!');
        setNotesText('');
        setToggleRow(null); // ✅ hide NotesTaker
      })
      .catch(err => {
        toast.error(`❌ ${err}`);
        // modal stays open on error
      })
      .finally(() => {
        setSubmitting(false);
      });
  };



  useEffect(() => {
    dispatch(fetchBookMark())
  }, [dispatch])

  useEffect(() => {
    setCurrentPage(1);
  }, [data, selectCard]);

  const getFlatValue = (obj, path) => obj?.[path];

  const sortedDataCreatedDate = [...data].sort(
    (a, b) => new Date(b['Contracts.TermEndDate']) - new Date(a['Contracts.TermEndDate'])
  );

  const sortedData = useMemo(() => {
   
    const details = sortedDataCreatedDate;
    if (!sortKey || !details) return details;

    return [...details].sort((a, b) => {
      const aValue = getFlatValue(a, sortKey);
      const bValue = getFlatValue(b, sortKey);

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? Number(bValue) - Number(aValue)
        : Number(aValue) - Number(bValue);
    });
  }, [sortedDataCreatedDate, sortKey, sortOrder]);

  const totalItems = (data && data?.length) || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = sortedData && sortedData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="table-container">
        <table className="contract-table">
          <TableHeader sortOrder={sortOrder} handleSort={handleSort} />
          <tbody>
            {renewalType ? (
              renewalType.length > 0 ? (
                renewalType.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.month}</td>
                    <td>{row.AutoRenew}</td>
                    <td>{row.ManualRenew}</td>
                    <td>{row.OneTimeRenew}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <NoDataAvailable />
                  </td>
                </tr>
              )
            ) : (
              paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((item, index) => {
                  const endDateRaw = item["Contracts.TermEndDate"];
                  const contractsRawKey = item["Contracts.RowKey"];
                  let displayValue = '-';
                  if (endDateRaw) {
                    const end = new Date(endDateRaw);
                    const today = new Date();
                    const diff = end - today;
                    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    displayValue = days >= 0 ? `${days}` : 0;
                  }
                  return (
                    <tr key={index}>
                      <td className="col-checkbox">
                        <BookmarkButton
                          contractRowKey={contractsRawKey}
                          contractTitle={item["Contracts.ContractTitle"]}
                        />
                      </td>
                      <OverflowTooltip
                        text={item["Contracts.ContractTitle"] || "-"}
                        maxWidth="260px"
                      >
                        <a
                          className="custom-link"
                          href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Contracts/ContractDetails?ContractID=${item["Contracts.RowKey"]}&View=All`}
                        >
                          {item["Contracts.ContractTitle"] || <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>"-"</div>}
                        </a>
                      </OverflowTooltip>

                      <OverflowTooltip
                        text={item["Contracts.Counterparty"] || <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>-</div>}
                        maxWidth="160px"
                      >
                        {item["Contracts.Counterparty"] || <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>-</div>}
                      </OverflowTooltip>

                      <OverflowTooltip
                        text={item["Contracts.Region"] || <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>-</div>}
                        maxWidth="120px"
                      >
                        {item["Contracts.Region"] || <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>-</div>}
                      </OverflowTooltip>
                      <td>
                        {item["Contracts.AutoRenew"] === 'Yes'
                          ? 'Auto Renewal'
                          : item["Contracts.AutoRenew"] === 'No'
                            ? 'Manual'
                            : '-'}
                      </td>
                      <OverflowTooltip
                        text={item["Counterparty.CounterpartyType"] || <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>-</div>}
                        maxWidth="120px"
                      >
                        {item["Counterparty.CounterpartyType"] || <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>-</div>}
                      </OverflowTooltip>
                      <td>{item["Contracts.ContractValue"] ? `$ ${item["Contracts.ContractValue"]}` : <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>-</div>}</td>
                      <td>{displayValue}</td>
                      <td>
                        <div style={{ display: "flex", gap: "2px" }}>
                          <Tooltip text="Add a Note">
                            <Button
                              iconOnly
                              active={false}
                              bgColor="#F1F1F2"
                              width="10px"
                              height="10px"
                              padding="1rem"
                              // onClick={() => (contractsRawKey)}
                              onClick={() => clickHandel(contractsRawKey)}
                            >
                              <img src={notesIcon} alt="Chart" className="bookmark-image" />
                            </Button>
                          </Tooltip>
                          {toggleRow === contractsRawKey && (
                            <NotesTaker
                              setFetchNoteData={setFetchNoteData}
                              fetchNoteData={fetchNoteData}
                              setNotesText={setNotesText}
                              noteText={noteText}
                              validation={validation}
                              setValidation={setValidation}
                              handleSubmit={handleSubmit}
                              contractRowKey={contractsRawKey}
                              setToggle={setToggleRow}
                              submitting={submitting}
                              loadingNotes={loadingNotes}
                              dropdownData={notesDropdown}
                              selectedOptions={selectedOptions}
                              setSelectedOptions={setSelectedOptions}
                              handleOptionClick={handleOptionClick}
                              options={notesOptions}
                            />
                          )}
                          {modalContractId === item['Contracts.RowKey'] && (
                            <CommonModal
                              show={true}
                              handleClose={() => setModalContractId(null)}
                              title={`${item["Contracts.ContractTitle"]} summary`}
                              size="xl"
                              customClass="custom-width-modal"
                            >
                              <AiSummary
                                contractId={item['Contracts.RowKey']}
                                contractTitle={item['Contracts.ContractTitle']}
                                parties={item['Contracts.Counterparty']}
                                termEndDate={endDateRaw}
                                renewalType={item['Contracts.AutoRenew'] === "No" ? "Manual" : item['Contracts.AutoRenew'] === "Yes" ? "AutoRenewal" : ''}
                                contractType={item['Contracts.ContractType']}
                                businessArea={item['Contracts.BusinessArea']}
                                contractValue={item['Contracts.ContractValue']}
                                status={item['Contracts.Status']}
                              />
                            </CommonModal>
                          )}

                          <Tooltip text="AI Summary">
                            <Button
                              iconOnly
                              active={false}
                              bgColor="#F1F1F2"
                              width="10px"
                              height="10px"
                              padding="1rem"
                              onClick={() => setModalContractId(item['Contracts.RowKey'])}
                            // onClick={() => setShowModal(true)}
                            >
                              <img src={aiIcon} className="bookmark-image" alt="Status" />
                            </Button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <NoDataAvailable />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
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
