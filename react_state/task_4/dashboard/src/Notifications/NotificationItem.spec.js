import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders without crashing', () => {
    render(<NotificationItem />);
  });

  test('renders correct html with type and value props', () => {
    render(<NotificationItem type="default" value="test" />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
    expect(listItem).toHaveTextContent('test');
  });

  test('renders correct html with dangerouslySetInnerHTML prop', () => {
    const htmlObj = { __html: '<u>test</u>' };
    render(<NotificationItem type="urgent" html={htmlObj} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'urgent');
    expect(listItem.innerHTML).toBe('<u>test</u>');
  });

  test('calls markAsRead prop with correct id on click', () => {
    const markAsReadMock = jest.fn();
    render(
      <NotificationItem id={1} value="test" markAsRead={markAsReadMock} />,
    );

    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);

    expect(markAsReadMock).toHaveBeenCalledWith(1);
  });
});
