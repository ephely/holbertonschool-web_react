export const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_COURSES: 'SET_COURSES',
};

export const initialState = {
  displayDrawer: true,
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
  notifications: [],
  courses: [],
};

export function appReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case APP_ACTIONS.LOGIN: {
      const email = action.payload?.email || action.email || '';
      const password = action.payload?.password || action.password || '';
      return {
        ...state,
        user: {
          ...state.user,
          email,
          password,
          isLoggedIn: true,
        },
      };
    }
    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        user: {
          ...state.user,
          email: '',
          password: '',
          isLoggedIn: false,
        },
        courses: [],
      };
    case APP_ACTIONS.TOGGLE_DRAWER: {
      const display =
        action.payload !== undefined
          ? action.payload
          : action.displayDrawer !== undefined
            ? action.displayDrawer
            : !state.displayDrawer;
      return {
        ...state,
        displayDrawer: display,
      };
    }
    case APP_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload || action.notifications || [],
      };
    case APP_ACTIONS.MARK_NOTIFICATION_READ: {
      const idToRem =
        action.payload !== undefined
          ? typeof action.payload === 'object' && action.payload !== null
            ? action.payload.id
            : action.payload
          : action.id;
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => String(notif.id) !== String(idToRem),
        ),
      };
    }
    case APP_ACTIONS.SET_COURSES:
      return {
        ...state,
        courses: action.payload || action.courses || [],
      };
    default:
      return state;
  }
}
