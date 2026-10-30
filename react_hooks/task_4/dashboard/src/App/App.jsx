import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import newContext, { user as defaultUser } from '../Context/context';
import { getLatestNotification } from '../utils/utils';

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
    setCourses([]);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== Number(id)),
    );
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5173/notifications.json',
        );
        if (ignore) return;
        const data = Array.isArray(response.data) ? response.data : [];
        setNotifications(
          data.map((notif) =>
            notif.id === 3
              ? { ...notif, html: { __html: getLatestNotification() } }
              : notif,
          ),
        );
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
    };

    fetchNotifications();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) return undefined;

    let ignore = false;

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5173/courses.json');
        if (!ignore) {
          setCourses(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
    };

    fetchCourses();

    return () => {
      ignore = true;
    };
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      logOut,
    }),
    [user, logOut],
  );

  return (
    <newContext.Provider value={contextValue}>
      <div className="App min-h-screen flex flex-col justify-between p-4 md:p-8 font-sans">
        <Notifications
          displayDrawer={displayDrawer}
          notifications={notifications}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
        <Header />
        <main className="flex-grow">
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login
                logIn={logIn}
                email={user.email}
                password={user.password}
              />
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
    </newContext.Provider>
  );
}

export default App;
