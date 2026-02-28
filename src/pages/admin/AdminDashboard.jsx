
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <- use Link instead of <a> for SPA navigation
import "./AdminDashboard.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(stored);
  }, []);

  const totalComplaints = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const categoryCounts = {};
  complaints.forEach(c => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });
  const mostCommonCategory = Object.keys(categoryCounts).reduce(
    (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b),
    "N/A"
  );
  const resolutionRate = totalComplaints ? Math.round((resolved / totalComplaints) * 100) : 0;

  return (
    <div className="admin-dashboard-container">

      {/* ✅ Navigation Bar */}
      <nav className="admin-nav">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/categories">Manage Categories</Link>
      </nav>

      <h1>Admin Dashboard</h1>

      <div className="analytics-cards">
        <div className="analytics-card">
          <h2>Total Complaints</h2>
          <p>{totalComplaints}</p>
        </div>
        <div className="analytics-card">
          <h2>Most Common Category</h2>
          <p>{mostCommonCategory}</p>
        </div>
        <div className="analytics-card">
          <h2>Resolution Rate</h2>
          <p>{resolutionRate}%</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;