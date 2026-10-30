import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <footer className="App-footer border-t-2 border-[var(--color-main-color)] py-4 text-center italic text-sm md:text-base mt-auto">
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;
