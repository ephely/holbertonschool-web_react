import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders 2 input tags and 2 label tags', () => {
    render(<Login />);
    const inputElements = screen.getAllByRole('textbox');
    expect(inputElements).toHaveLength(1);
    const labels = screen.getAllByText(/email|password/i);
    expect(labels.length).toBeGreaterThanOrEqual(2);
  });

  test('focuses input element when related label is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailLabel = screen.getByText(/email/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    const passwordLabel = screen.getByText(/password/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });
});
