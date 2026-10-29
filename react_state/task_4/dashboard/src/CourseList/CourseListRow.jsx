import React from "react";
import PropTypes from "prop-types";

function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  const rowClass = isHeader
    ? "bg-table-header/66"
    : "bg-table-rows/45";

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={rowClass}>
          <th colSpan="2" className="border border-gray-400 py-2 text-center">
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr className={rowClass}>
        <th className="border border-gray-400 py-2 pl-2 text-left">
          {textFirstCell}
        </th>
        <th className="border border-gray-400 py-2 pl-2 text-left">
          {textSecondCell}
        </th>
      </tr>
    );
  }

  if (textSecondCell === null) {
    return (
      <tr className={rowClass}>
        <td colSpan="2" className="border border-gray-400 py-2 text-center">
          {textFirstCell}
        </td>
      </tr>
    );
  }

  return (
    <tr className={rowClass}>
      <td className="border border-gray-400 py-1 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 py-1 pl-2">{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.defaultProps = {
  isHeader: false,
  textFirstCell: "",
  textSecondCell: null,
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
