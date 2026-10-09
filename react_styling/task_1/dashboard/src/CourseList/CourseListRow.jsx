import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const rowBgClass = isHeader
    ? 'bg-[var(--color-table-header)]/66'
    : 'bg-[var(--color-table-rows)]/45';

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={rowBgClass}>
          <th
            colSpan="2"
            className="border border-gray-400 text-center py-2 font-bold"
          >
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr className={rowBgClass}>
        <th className="border border-gray-400 text-left pl-2 py-2 font-bold">
          {textFirstCell}
        </th>
        <th className="border border-gray-400 text-left pl-2 py-2 font-bold">
          {textSecondCell}
        </th>
      </tr>
    );
  }

  if (textSecondCell === null) {
    return (
      <tr className={rowBgClass}>
        <td colSpan="2" className="border border-gray-400 text-center py-2">
          {textFirstCell}
        </td>
      </tr>
    );
  }

  return (
    <tr className={rowBgClass}>
      <td className="border border-gray-400 pl-2 py-1">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2 py-1">{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
