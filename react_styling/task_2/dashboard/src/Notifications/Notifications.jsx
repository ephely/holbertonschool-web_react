import React, { Component } from 'react';
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

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const currentLength = this.props.notifications
      ? this.props.notifications.length
      : 0;
    const nextLength = nextProps.notifications
      ? nextProps.notifications.length
      : 0;

    return (
      nextLength !== currentLength ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, notifications } = this.props;

    return (
      <div className="NotificationsComp absolute right-3 top-3 z-10 flex flex-col items-end">
        <div className="menuItem font-bold cursor-pointer mb-2">
          Your notifications
        </div>
        {displayDrawer && (
          <div className="Notifications relative w-[25%] min-w-[300px] border-2 border-dashed border-[var(--main-color)] p-[6px] bg-white">
            <button
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="close icon" width="10px" />
            </button>
            <p className="text-sm font-medium mb-2">
              Here is the list of notifications
            </p>
            <ul className="list-disc pl-5">
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
                    markAsRead={this.markAsRead}
                  />
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(NotificationItemShape),
};

export default Notifications;
