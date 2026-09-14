import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
    test('renders without crashing', () => {
        render(<Login />);
    });

    test('renders 2 labels, 2 inputs, and 1 button', () => {
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

    test('focuses input element when related label is clicked', () => {
        render(<Login />);
        const emailLabel = screen.getByText(/email/i);
        const emailInput = screen.getByLabelText(/email/i);

        fireEvent.click(emailLabel);
        expect(emailInput).toHaveFocus();

        const passwordLabel = screen.getByText(/password/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.click(passwordLabel);
        expect(passwordInput).toHaveFocus();
    });
});