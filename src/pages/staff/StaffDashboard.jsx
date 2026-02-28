
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./StaffDashboard.css";

function StaffDashboard() {
  const loggedInStaff = "staff001";
  const [allComplaints, setAllComplaints] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState("");

  // Load complaints from localStorage initially
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setAllComplaints(saved);
  }, []);

  // Filter complaints assigned to staff
  useEffect(() => {
    let filtered = allComplaints.filter((c) => c.assignedTo === loggedInStaff);
    if (filter !== "All") filtered = filtered.filter((c) => c.status === filter);
    setComplaints(filtered);
  }, [allComplaints, filter]);

  // Listen for student submission events
  useEffect(() => {
    const handler = () => {
      const saved = JSON.parse(localStorage.getItem("complaints")) || [];
      setAllComplaints(saved);
      setToast("New complaint submitted!");
      setTimeout(() => setToast(""), 3000);
    };
    window.addEventListener("complaintsUpdated", handler);
    return () => window.removeEventListener("complaintsUpdated", handler);
  }, []);

  const countStatus = (status) =>
    allComplaints.filter((c) => c.assignedTo === loggedInStaff && c.status === status).length;

  // Update complaint status
  const updateStatus = (id) => {
    const updated = allComplaints.map((c) => {
      if (c.id === id && c.assignedTo === loggedInStaff) {
        let newStatus = c.status;
        if (c.status === "Open") newStatus = "In Progress";
        else if (c.status === "In Progress") newStatus = "Resolved";
        setToast(`Ticket ${c.id} moved to ${newStatus}`);
        setTimeout(() => setToast(""), 3000);
        return {
          ...c,
          status: newStatus,
          resolvedAt: newStatus === "Resolved" ? new Date().toISOString() : c.resolvedAt,
        };
      }
      return c;
    });
    setAllComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  const total = allComplaints.filter((c) => c.assignedTo === loggedInStaff).length;
  const resolved = countStatus("Resolved");
  const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

  return (
    <div className="staff-dashboard-container">
      {toast && <div className="toast">{toast}</div>}

      <h1>Staff Dashboard</h1>

      <div className="cards-container">
        {["Open", "In Progress", "Resolved"].map((status) => (
          <div
            key={status}
            className={`card ${status.toLowerCase().replace(" ", "-")}`}
            onClick={() => setFilter(status)}
          >
            <h2>{status} Tickets</h2>
            <p>{countStatus(status)}</p>
          </div>
        ))}
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar open" style={{ width: `${(countStatus("Open") / total) * 100 || 0}%` }} />
        <div className="progress-bar in-progress" style={{ width: `${(countStatus("In Progress") / total) * 100 || 0}%` }} />
        <div className="progress-bar resolved" style={{ width: `${(countStatus("Resolved") / total) * 100 || 0}%` }} />
      </div>

      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Resolution Rate: {resolutionRate}%
        {filter !== "All" && <span> | Filter: {filter}</span>}
      </p>

      <div className="assigned-section">
        <h2>Assigned Tickets</h2>
        {complaints.length === 0 && <p style={{ color: "#aaa" }}>No tickets to display.</p>}
        {complaints.map((c) => (
          <div key={c.id} className="ticket-card">
            <strong>{c.id}</strong> - {c.category} <br />
            Status: <span className="ticket-status">{c.status}</span>
            {c.status !== "Resolved" && (
              <button className="ticket-btn" onClick={() => updateStatus(c.id)}>
                {c.status === "Open" ? "Start Progress" : "Mark Resolved"}
              </button>
            )}
            {c.status === "Resolved" && c.resolvedAt && (
              <div className="resolved-time">
                Resolved At: {new Date(c.resolvedAt).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      <Link to="/staff/assigned-complaints" className="view-link">
        View Assigned Complaints
      </Link>
    </div>
  );
}

export default StaffDashboard;