import React from 'react';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';
import useLogin from '../hooks/useLogin';

function Login({ logIn }) {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  } = useLogin(logIn);

  return (
    <div className="App-body my-4">
      <p className="mb-4 text-base md:text-lg">
        Login to access the full dashboard
      </p>
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col md:flex-row items-start md:items-center gap-4"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            className="border border-gray-400 rounded p-1 w-full md:w-auto"
          />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            className="border border-gray-400 rounded p-1 w-full md:w-auto"
          />
        </div>
        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className={`border border-gray-400 rounded px-3 py-1 ${
            enableSubmit
              ? 'cursor-pointer hover:bg-gray-100 bg-white'
              : 'opacity-50 cursor-not-allowed bg-gray-200'
          }`}
        />
      </form>
    </div>
  );
}

Login.defaultProps = {
  logIn: () => {},
};

Login.propTypes = {
  logIn: PropTypes.func,
};

export default WithLogging(Login);
