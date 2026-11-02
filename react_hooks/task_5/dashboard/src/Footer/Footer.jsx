import React, { useContext } from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import newContext from '../Context/context';

function Footer() {
  const { user } = useContext(newContext);

  return (
    <footer className="App-footer border-t-2 border-[var(--color-main-color)] py-4 text-center italic text-sm md:text-base mt-auto">
      {user.isLoggedIn && (
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

export default Footer;
