import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { courses } from '../data/courses';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SORT_KEYS = ['title', 'id', 'slug'];

function sortCourses(courses, key) {
  const sortedCourses = [...courses];
  if (!key || !SORT_KEYS.includes(key)) {
    return sortedCourses;
  }
  sortedCourses.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  return sortedCourses;
}

const Courses = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState(query.sort || '');
  const [searchQuery, setSearchQuery] = useState(query.search || '');
  const [sortedCourses, setSortedCourses] = useState([]);

  useEffect(() => {
    const newQuery = queryString.stringify({ sort: sortKey, search: searchQuery });
    navigate(`${location.pathname}?${newQuery}`);
  }, [sortKey, searchQuery, navigate, location.pathname]);

  useEffect(() => {
    if (!SORT_KEYS.includes(sortKey)) {
      setSortKey('');
    }
  }, [sortKey]);

  useEffect(() => {
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const sortedFilteredCourses = sortCourses(filteredCourses, sortKey);
    setSortedCourses(sortedFilteredCourses);
  }, [searchQuery, sortKey]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  };

  return (
    <>
      <h1>{sortKey ? `Courses sorted by: ${sortKey}` : 'Courses'}</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search courses..."
      />
      <select value={sortKey} onChange={handleSortChange}>
        <option value="">Sort by...</option>
        {SORT_KEYS.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {sortedCourses.length > 0 ? (
        <ul>
          {sortedCourses.map((course) => (
            <li key={course.id}>
              <Link className="courseLink" to={course.slug}>
                {course.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </>
  );
};

export default Courses;
