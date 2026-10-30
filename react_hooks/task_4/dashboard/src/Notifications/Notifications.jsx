import React, { memo } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-icon.png';

const NotificationItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
});

function Notifications({
  displayDrawer = false,
  notifications = [],
  handleDisplayDrawer = () => {},
  handleHideDrawer = () => {},
  markNotificationAsRead = () => {},
}) {
  return (
    <div className="NotificationsComp absolute top-3 right-3 flex flex-col items-end z-50">
      <div
        className="menuItem font-normal text-right mb-1 cursor-pointer"
        onClick={handleDisplayDrawer}
      >
        Your notifications
      </div>
      {displayDrawer && (
        <div className="Notifications fixed inset-0 max-[912px]:w-full max-[912px]:h-full max-[912px]:bg-white max-[912px]:p-3 max-[912px]:text-xl min-[912px]:relative min-[912px]:inset-auto min-[912px]:w-[350px] min-[912px]:border-2 min-[912px]:border-dotted min-[912px]:border-[var(--color-main-color)] min-[912px]:p-[6px] min-[912px]:text-base">
          <button
            style={{
              position: 'absolute',
              right: '12px',
              top: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Close"
            onClick={handleHideDrawer}
          >
            <img src={closeIcon} alt="close icon" className="w-3 h-3" />
          </button>
          {notifications.length > 0 && (
            <p className="m-0 pr-6 max-[912px]:text-xl max-[912px]:mb-4">
              Here is the list of notifications
            </p>
          )}
          <ul className="max-[912px]:list-none max-[912px]:p-0 max-[912px]:m-0 min-[912px]:list-disc min-[912px]:pl-8">
            {notifications.length === 0 ? (
              <NotificationItem value="No new notification for now" />
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  id={notif.id}
                  type={notif.type}
                  value={notif.value}
                  html={notif.html}
                  markAsRead={markNotificationAsRead}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

export default memo(Notifications);
