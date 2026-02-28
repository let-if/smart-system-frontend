
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ChatWindow from "../../components/ChatWindow";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [user, setUser] = useState({});
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(savedUser);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.fullName || "Student"}!</h1>
      <p className="dashboard-ugr">UGR: {user.ugr || "N/A"}</p>

      <div className="cards-container">
        <Link to="/student/profile" className="dashboard-card">
          <h2>Profile</h2>
          <p>View or edit your student profile</p>
        </Link>

        <Link to="/student/courses" className="dashboard-card">
          <h2>Courses</h2>
          <p>Check your enrolled courses</p>
        </Link>

        <Link to="/student/grades" className="dashboard-card">
          <h2>Grades</h2>
          <p>See your grades for each course</p>
        </Link>

        <Link to="/student/complaint/submit" className="dashboard-card">
          <h2>Submit Complaint</h2>
          <p>File a new complaint</p>
        </Link>

        <Link to="/student/complaint/tracking" className="dashboard-card">
          <h2>Track Complaints</h2>
          <p>Check status of your complaints</p>
        </Link>
      </div>

      {/* Chatbot button */}
      <button
        className="chatbot-toggle-btn"
        onClick={() => setShowChat((prev) => !prev)}
      >
        {showChat ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {showChat && <ChatWindow />}
    </div>
  );
}

export default StudentDashboard;