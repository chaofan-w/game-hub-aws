import PropTypes from "prop-types";
import { convertDateFormat } from "../utils";

const RentalRecordsTable = ({ record }) => {
  return (
    <tr>
      {/* <td className="text-start d-none d-md-block">{record._id}</td> */}
      <td>{convertDateFormat(record.rentalStartDate)}</td>
      <td>{convertDateFormat(record.rentalEndDate)}</td>
    </tr>
  );
};

RentalRecordsTable.propTypes = {
  record: PropTypes.object.isRequired,
};

export default RentalRecordsTable;
