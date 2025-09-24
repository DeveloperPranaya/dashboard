import ShortIcon from "../../assets/images/contractstack/short.png";
import ShortAssending from "../../assets/images/contractstack/shortAssensing.png";
import ShortDecending from "../../assets/images/contractstack/shortDecending.png";
import { tableHeaders } from '../../mockdata/mockdata';

const TableHeader = ({ sortKey, sortOrder, handleSort }) => (
  <thead>
    <tr>
      {tableHeaders.map((h) => (
        <th
          key={h.id}
          onClick={() => h.sortable && handleSort(h.key)}
          style={{ cursor: h.sortable ? "pointer" : "default" }}
        >
          {h.label}
          {h.sortable && (
            <span>
              {sortOrder === "asc" ? (
                <img src={ShortAssending} alt="Ascending" />
              ) : sortOrder === "desc" ? (
                <img src={ShortDecending} alt="Descending" />
              ) : (
                <img src={ShortIcon} alt="Default" />
              )}
            </span>
          )}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;