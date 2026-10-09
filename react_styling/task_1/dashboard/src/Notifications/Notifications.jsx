import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-button.png';
import './Notifications.css';

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
      <div className="NotificationsComp">
        <div className="menuItem">Your notifications</div>
        {displayDrawer && (
          <div className="Notifications">
            <button
              style={{
                position: 'absolute',
                right: '15px',
                top: '15px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="close icon" width="10px" />
            </button>
            <p>Here is the list of notifications</p>
            <ul>
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
