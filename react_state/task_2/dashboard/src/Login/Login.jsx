import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  validateForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;

    this.setState({
      enableSubmit: isEmailValid && isPasswordValid,
    });
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState({ email }, () => {
      this.validateForm(this.state.email, this.state.password);
    });
  }

  handleChangePassword(event) {
    const password = event.target.value;
    this.setState({ password }, () => {
      this.validateForm(this.state.email, this.state.password);
    });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body my-4">
        <p className="mb-4 text-base md:text-lg">
          Login to access the full dashboard
        </p>
        <form
          onSubmit={this.handleLoginSubmit}
          className="flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChangeEmail}
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
              onChange={this.handleChangePassword}
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
}

Login.defaultProps = {
  logIn: () => {},
};

Login.propTypes = {
  logIn: PropTypes.func,
};

export default Login;
