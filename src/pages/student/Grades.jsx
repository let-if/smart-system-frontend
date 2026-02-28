
import { useState, useEffect } from "react";
import "./Grades.css";

function Grades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const savedGrades = JSON.parse(localStorage.getItem("grades")) || [
      { course: "Mathematics 101", mid: 95, project: 88, quiz: 92, test: 85, assignment: 90, final: 97 },
      { course: "Physics 201", mid: 87, project: 91, quiz: 83, test: 88, assignment: 90, final: 89 },
      { course: "Computer Science 301", mid: 92, project: 95, quiz: 85, test: 94, assignment: 96, final: 98 },
    ];
    setGrades(savedGrades);
  }, []);

  return (
    <div className="grades-container">
      <h1>My Grades</h1>

      {grades.length === 0 && <p>No grades recorded.</p>}

      <div className="grades-wrapper">
        <table className="grades-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Mid</th>
              <th>Project</th>
              <th>Quiz</th>
              <th>Test</th>
              <th>Assignment</th>
              <th>Final</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((item, index) => (
              <tr key={index}>
                <td>{item.course}</td>
                <td>{item.mid}</td>
                <td>{item.project}</td>
                <td>{item.quiz}</td>
                <td>{item.test}</td>
                <td>{item.assignment}</td>
                <td>{item.final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;