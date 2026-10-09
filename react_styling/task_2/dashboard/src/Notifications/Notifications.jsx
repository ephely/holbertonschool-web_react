import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";
import closeButton from "../assets/close-button.png";

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
      <div className="NotificationsComp absolute top-3 right-3 flex flex-col items-end float-right">
        <div className="menuItem font-normal text-right mb-1">
          Your notifications
        </div>
        {displayDrawer && (
          <div className="Notifications relative border-2 border-dotted border-[var(--main-color)] p-[6px] w-full md:w-1/4">
            <button
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Close"
              onClick={() => console.log("Close button has been clicked")}
            >
              <img src={closeButton} alt="close icon" className="w-2.5 h-2.5" />
            </button>
            {notifications.length === 0 ? (
              <p className="m-0">No new notification for now</p>
            ) : (
              <>
                <p className="m-0 pr-6">Here is the list of notifications</p>
                <ul className="list-disc pl-8 m-0">
                  {notifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      id={notif.id}
                      type={notif.type}
                      value={notif.value}
                      html={notif.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
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
