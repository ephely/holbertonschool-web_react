import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

const CourseShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  credit: PropTypes.number.isRequired,
});

function CourseList({ courses }) {
  return (
    <div className="w-[80%] mx-auto my-12">
      <table
        id="CourseList"
        className="w-full border-collapse border border-gray-400"
      >
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={false}
            />
          ) : (
            courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isHeader={false}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

CourseList.defaultProps = {
  courses: [],
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(CourseShape),
};

export default CourseList;
