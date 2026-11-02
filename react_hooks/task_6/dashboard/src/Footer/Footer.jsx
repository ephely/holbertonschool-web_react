import React from 'react';
import PropTypes from 'prop-types';
import { getFullYear, getFooterCopy } from '../utils/utils';

function Footer({ user }) {
  return (
    <footer className="App-footer border-t-2 border-[var(--color-main-color)] py-4 text-center italic text-sm md:text-base mt-auto">
      {user && user.isLoggedIn && (
        <p className="mb-2">
          <a href="#" className="not-italic underline">
            Contact us
          </a>
        </p>
      )}
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

Footer.defaultProps = {
  user: { isLoggedIn: false },
};

Footer.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

export default Footer;
