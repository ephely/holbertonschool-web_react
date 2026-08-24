import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';
import './Notifications.css';

function Notifications() {
  const handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  return (
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
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
      </ul>
    </div>
  );
}

export default Notifications;
