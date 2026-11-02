import React from 'react';
import PropTypes from 'prop-types';

function BodySection({ title, children }) {
  return (
    <div className="bodySection my-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySection;
