import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  const rowStyle = {
    backgroundColor: isHeader ? '#deb5b5' : '#CDCDCD',
    opacity: isHeader ? '0.66' : '0.45',
  };

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={rowStyle}>
          <th colSpan="2" className="border border-gray-400 py-2 text-center">
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr style={rowStyle}>
        <th className="border border-gray-400 py-2 pl-2 text-left">
          {textFirstCell}
        </th>
        <th className="border border-gray-400 py-2 pl-2 text-left">
          {textSecondCell}
        </th>
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td className="border border-gray-400 py-1 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 py-1 pl-2">{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
