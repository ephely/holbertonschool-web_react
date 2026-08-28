import PropTypes from 'prop-types';

function NotificationItem({ type = 'default', html, value }) {
  const isUrgent = type === 'urgent';
  const itemStyle = {
    color: isUrgent ? 'red' : 'blue',
  };

  if (html) {
    return (
      <li
        data-priority={type}
        data-notification-type={type}
        style={itemStyle}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li data-priority={type} data-notification-type={type} style={itemStyle}>
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
};

export default NotificationItem;
