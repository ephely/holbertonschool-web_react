import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem.jsx';
import './Notifications.css';

function Notifications({ displayDrawer = false, notifications = [] }) {
  const handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <>
      <div className="notification-title">Your notifications</div>
      {displayDrawer && (
        <div className="notification-items">
          <button
            type="button"
            aria-label="Close"
            onClick={handleCloseClick}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <img
              src={closeIcon}
              alt="close icon"
              style={{ width: '15px', height: '15px' }}
            />
          </button>
          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>
              <ul>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    }),
  ),
};

export default Notifications;
