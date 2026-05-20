/**
 * @file SearchSort.jsx
 * @description Search, sort, and course-filter controls for the student profiles.
 *              All state lives in App — this component is purely presentational
 *              and reports changes upward via callback props.
 *
 *              Search   – filters by student name or course (case-insensitive).
 *              Sort     – orders results by name (A–Z / Z–A) or age (↑ / ↓).
 *              Course   – shows clickable tabs for each unique course in the list,
 *                         plus an "All" tab to clear the filter.
 */

/**
 * SearchSort – renders the search input, sort selector, and course filter tabs.
 *
 * @param {object}   props
 * @param {string}   props.searchQuery      - Current search string (controlled).
 * @param {string}   props.sortBy           - Active sort key (controlled).
 * @param {string}   props.courseFilter     - Active course filter or "all" (controlled).
 * @param {string[]} props.courses          - Unique course names derived from students.
 * @param {Function} props.onSearch         - Called with the new search string.
 * @param {Function} props.onSort           - Called with the new sort key.
 * @param {Function} props.onCourseFilter   - Called with the selected course or "all".
 * @returns {JSX.Element}
 */
function SearchSort({ searchQuery, sortBy, courseFilter, courses, onSearch, onSort, onCourseFilter }) {
  return (
    <div className="search-sort-bar">

      {/* Free-text search filters both name and course fields */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by name or course..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Sort selector */}
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="default">Sort: Default</option>
        <option value="name-asc">Name A – Z</option>
        <option value="name-desc">Name Z – A</option>
        <option value="age-asc">Age ↑</option>
        <option value="age-desc">Age ↓</option>
      </select>

      {/* Course filter tabs — only rendered when there is at least one student */}
      {courses.length > 0 && (
        <div className="course-tabs">
          {/* "All" tab resets the course filter */}
          <button
            className={`course-tab ${courseFilter === "all" ? "course-tab--active" : ""}`}
            onClick={() => onCourseFilter("all")}
          >
            All
          </button>

          {courses.map((course) => (
            <button
              key={course}
              className={`course-tab ${courseFilter === course ? "course-tab--active" : ""}`}
              onClick={() => onCourseFilter(course)}
            >
              {course}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}

export default SearchSort;
