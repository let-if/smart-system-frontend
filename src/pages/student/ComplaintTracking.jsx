
import { useState, useEffect } from "react";
import "./ComplaintTracking.css";

function ComplaintTracking() {
  const [complaints, setComplaints] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("complaints")) || [];
    const filtered = loggedInUser?.role === "student"
      ? stored.filter(c => c.student === loggedInUser.id)
      : stored.filter(c => c.assignedTo === loggedInUser?.id);
    setComplaints(filtered);
  }, [loggedInUser]);

  if (!loggedInUser) return <p>Please login to view complaints</p>;

  return (
    <div className="tracking-container">
      <h1>My Complaints</h1>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <table className="tracking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{c.priority}</td>
                <td className={`status ${c.status.toLowerCase().replace(" ", "-")}`}>{c.status}</td>
                <td>{new Date(c.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComplaintTracking;