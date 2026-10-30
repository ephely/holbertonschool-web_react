import React, { Component } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context';

class Header extends Component {
  render() {
    const { user, logOut } = this.context;

    return (
      <header className="App-header flex flex-col w-full">
        <div className="flex flex-col min-[520px]:flex-row items-center border-b-2 border-[var(--color-main-color)] pb-4 mb-4">
          <img
            src={holbertonLogo}
            alt="holberton logo"
            className="w-36 h-36 min-[520px]:w-48 min-[520px]:h-48"
          />
          <h1 className="text-[var(--color-main-color)] text-2xl min-[520px]:text-3xl font-bold mt-2 min-[520px]:mt-0 min-[520px]:ml-4 text-center min-[520px]:text-left">
            School Dashboard
          </h1>
        </div>
        {user.isLoggedIn && (
          <section
            id="logoutSection"
            className="flex justify-between items-center px-4 py-2 text-lg"
          >
            <p>
              Welcome {user.email} (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
                className="italic cursor-pointer underline"
              >
                logout
              </a>
              )
            </p>
          </section>
        )}
      </header>
    );
  }
}

Header.contextType = newContext;

export default Header;
