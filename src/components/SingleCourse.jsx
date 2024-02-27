import React from 'react';
import { courses } from '../data/courses';
import { Link, useParams } from 'react-router-dom';

const SingleCourse = () => {
  const params = useParams();
  const course = courses.find((course) => course.slug === params.slug);
  return (
    <>
      <h1>{course.title}</h1>
      <Link to=".." relative="path">
        All Courses
      </Link>
    </>
  );
};

export default SingleCourse;
