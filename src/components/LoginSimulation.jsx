
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSimulation.css";

function LoginSimulation() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");

  // Sample users
  const students = [
    { id: "student001", name: "letif" },
    { id: "student002", name: "fkr" },
  ];
  const staff = [
    { id: "staff001", name: "Mr. megerssa" },
    { id: "staff002", name: "Ms. melese" },
  ];

  const handleLogin = () => {
    if (!userId) return alert("Please select a user to login");

    const user = role === "student" 
      ? students.find(s => s.id === userId) 
      : staff.find(s => s.id === userId);

    localStorage.setItem("loggedInUser", JSON.stringify({ id: user.id, role }));
    alert(`Logged in as ${user.name} (${role})`);

    // Redirect based on role
    if (role === "student") navigate("/student/submit");
    else navigate("/staff/dashboard");
  };

  return (
    <div className="login-simulation-container">
      <h2>Login Simulation</h2>

      <div className="login-role">
        <label>Role:</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="login-user">
        <label>Select User:</label>
        <select value={userId} onChange={e => setUserId(e.target.value)}>
          <option value="">-- Select --</option>
          {(role === "student" ? students : staff).map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginSimulation;