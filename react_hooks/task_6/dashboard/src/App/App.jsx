import React, { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { displayDrawer, user, notifications, courses } = state;

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: true });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: false });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: { id } });
  }, []);

  // Fetch notifications on mount
  useEffect(() => {
    axios
      .get('http://localhost:5173/notifications.json')
      .then((response) => {
        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      });
  }, []);

  // Fetch courses when user authentication status changes
  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .get('http://localhost:5173/courses.json')
        .then((response) => {
          dispatch({ type: APP_ACTIONS.SET_COURSES, payload: response.data });
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== 'production') {
            console.error(error);
          }
        });
    }
  }, [user.isLoggedIn]);

  const staticCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  const activeCourses = courses.length > 0 ? courses : staticCourses;

  return (
    <div className="App min-h-screen flex flex-col justify-between p-4 md:p-8 font-sans">
      <Notifications
        displayDrawer={displayDrawer}
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <Header user={user} logOut={logOut} />
      <main className="flex-grow">
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={activeCourses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} email={user.email} password={user.password} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p className="text-sm md:text-base leading-relaxed">
            ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Similique, asperiores architecto blanditiis fuga doloribus sit illum
            aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut
            magni dicta. Recusandae, quia dicta?
          </p>
        </BodySection>
      </main>
      <Footer user={user} />
    </div>
  );
}

export default App;
