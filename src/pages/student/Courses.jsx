
import { useState, useEffect } from "react";
import "./Courses.css";

function Courses() {
  // Load courses from localStorage or use default mock data
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [
      { name: "Mathematics 101", instructor: "Dr. Smith", schedule: "Mon & Wed 10:00-11:30" },
      { name: "Physics 201", instructor: "Dr. Brown", schedule: "Tue & Thu 14:00-15:30" },
      { name: "Computer Science 301", instructor: "Prof. Johnson", schedule: "Fri 09:00-12:00" },
    ];
    setCourses(savedCourses);
  }, []);

  return (
    <div className="courses-container">
      <h1>My Courses</h1>
      {courses.length === 0 && <p>No courses assigned.</p>}

      <div className="courses-list">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h2>{course.name}</h2>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Schedule:</strong> {course.schedule}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;