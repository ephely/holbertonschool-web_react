import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications title text', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button element', () => {
    render(<Notifications />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders 3 list item elements and checks their text content ignoring case', () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
  });

  test('logs "Close button has been clicked" to the console when close button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications />);

    const buttonElement = screen.getByRole('button', { name: /close/i });
    fireEvent.click(buttonElement);

    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });
});
