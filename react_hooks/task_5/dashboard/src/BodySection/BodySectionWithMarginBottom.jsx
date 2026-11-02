import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';

function BodySectionWithMarginBottom(props) {
  return (
    <div className="bodySectionWithMargin mb-10">
      <BodySection {...props} />
    </div>
  );
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySectionWithMarginBottom;
