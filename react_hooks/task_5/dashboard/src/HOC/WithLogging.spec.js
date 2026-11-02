import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    cleanup();
  });

  test('renders heading element with correct text', () => {
    const ComponentWithLogging = WithLogging(MockApp);
    render(<ComponentWithLogging />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello from Mock App Component');
  });

  test('logs console message on mount and unmount with component name', () => {
    const ComponentWithLogging = WithLogging(MockApp);
    const { unmount } = render(<ComponentWithLogging />);

    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component MockApp is going to unmount',
    );
  });

  test('logs console message on mount and unmount with "Component" when wrapped component has no name', () => {
    const AnonymousComponent = () => <h1>Pure HTML Component</h1>;
    // Forcer la suppression du nom pour simuler un composant anonyme
    Object.defineProperty(AnonymousComponent, 'name', { value: '' });

    const ComponentWithLogging = WithLogging(AnonymousComponent);
    const { unmount } = render(<ComponentWithLogging />);

    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Component is going to unmount',
    );
  });
});
