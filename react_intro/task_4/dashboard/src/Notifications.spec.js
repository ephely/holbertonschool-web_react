import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the text "Here is the list of notifications"', () => {
    render(<Notifications />);
    const paragraphText = screen.getByText(
      /here is the list of notifications/i,
    );
    expect(paragraphText).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test('renders 3 list items', () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  test('logs "Close button has been clicked" to the console when button is clicked', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications />);

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith('Close button has been clicked');
    spy.mockRestore();
  });
});
