import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import WithLogging from '../HOC/WithLogging';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      {
        id: 3,
        type: 'urgent',
        html: {
          __html: '<strong>Urgent requirement</strong> - complete by EOD',
        },
      },
    ];

    return (
      <div className="App min-h-screen flex flex-col justify-between p-4 md:p-8 font-sans">
        <Notifications displayDrawer={true} notifications={listNotifications} />
        <Header />
        <main className="flex-grow">
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={listCourses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p className="text-sm md:text-base leading-relaxed">
              ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique, asperiores architecto blanditiis fuga doloribus sit
              illum aliquid ea distinctio minus accusantium, impedit quo
              voluptatibus ut magni dicta. Recusandae, quia dicta?
            </p>
          </BodySection>
        </main>
        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default WithLogging(App);
