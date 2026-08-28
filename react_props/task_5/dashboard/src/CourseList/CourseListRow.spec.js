import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  describe('when isHeader is true', () => {
    test('renders one th element with colSpan = 2 when textSecondCell is null', () => {
      render(<CourseListRow isHeader={true} textFirstCell="Header title" />);
      const headerCell = screen.getByRole('columnheader');

      expect(headerCell).toBeInTheDocument();
      expect(headerCell).toHaveAttribute('colspan', '2');
      expect(headerCell).toHaveTextContent('Header title');
    });

    test('renders two th elements when textSecondCell is provided', () => {
      render(
        <CourseListRow
          isHeader={true}
          textFirstCell="Col 1"
          textSecondCell="Col 2"
        />,
      );
      const headers = screen.getAllByRole('columnheader');

      expect(headers).toHaveLength(2);
      expect(headers[0]).toHaveTextContent('Col 1');
      expect(headers[1]).toHaveTextContent('Col 2');
    });
  });

  describe('when isHeader is false', () => {
    test('renders two td elements within a tr element', () => {
      render(
        <table>
          <tbody>
            <CourseListRow
              isHeader={false}
              textFirstCell="ES6"
              textSecondCell="60"
            />
          </tbody>
        </table>,
      );
      const cells = screen.getAllByRole('cell');

      expect(cells).toHaveLength(2);
      expect(cells[0]).toHaveTextContent('ES6');
      expect(cells[1]).toHaveTextContent('60');
    });
  });
});
