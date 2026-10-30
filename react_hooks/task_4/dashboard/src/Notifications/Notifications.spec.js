import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
  ];

  test('renders without crashing', () => {
    render(<Notifications />);
  });

  test('renders correct number of NotificationItem components', () => {
    render(
      <Notifications displayDrawer={true} notifications={listNotifications} />,
    );
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  test('calls handleDisplayDrawer when menu item is clicked', () => {
    const handleDisplayDrawerSpy = jest.fn();
    render(<Notifications handleDisplayDrawer={handleDisplayDrawerSpy} />);

    const menuItem = screen.getByText('Your notifications');
    fireEvent.click(menuItem);

    expect(handleDisplayDrawerSpy).toHaveBeenCalled();
  });

  test('calls handleHideDrawer when close button is clicked', () => {
    const handleHideDrawerSpy = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        handleHideDrawer={handleHideDrawerSpy}
      />,
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleHideDrawerSpy).toHaveBeenCalled();
  });
});
