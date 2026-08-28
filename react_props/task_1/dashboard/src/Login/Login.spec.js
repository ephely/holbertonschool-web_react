import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders 2 label, 2 input, and 1 button elements', () => {
    render(<Login />);
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const buttonElement = screen.getByRole('button', { name: /ok/i });

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
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
