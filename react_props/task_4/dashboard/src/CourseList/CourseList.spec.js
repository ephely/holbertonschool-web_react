import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

describe('CourseList component', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  test('renders CourseList component without crashing', () => {
    render(<CourseList />);
  });

  test('renders 5 different rows when array of courses is passed', () => {
    render(<CourseList courses={listCourses} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });

  test('renders 3 rows when empty array or no array is passed', () => {
    render(<CourseList courses={[]} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
    expect(screen.getByText('No course available yet')).toBeInTheDocument();
  });
});
