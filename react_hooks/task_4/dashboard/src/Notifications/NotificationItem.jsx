import React, { memo } from 'react';
import PropTypes from 'prop-types';

function NotificationItem({
  type = 'default',
  html,
  value = '',
  markAsRead = () => {},
  id = 0,
}) {
  const textColorClass =
    type === 'urgent'
      ? 'text-[var(--color-urgent-notification-item)]'
      : 'text-[var(--color-default-notification-item)]';

  const itemClasses = `cursor-pointer ${textColorClass} text-xl max-[912px]:border-b max-[912px]:border-black max-[912px]:py-2 max-[912px]:px-2 min-[912px]:text-base`;

  if (html) {
    return (
      <li
        data-notification-type={type}
        className={itemClasses}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      className={itemClasses}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

export default memo(NotificationItem);
