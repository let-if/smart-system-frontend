
import { useState, useEffect } from "react";
import "./AssignedComplaints.css";

function AssignedComplaints() {
  const loggedInStaff = "staff001"; // mock staff ID
  const [complaints, setComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);

  // Load complaints on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setAllComplaints(saved);
    setComplaints(saved.filter((c) => c.assignedTo === loggedInStaff));
  }, []);

  // Listen for live updates
  useEffect(() => {
    const handler = () => {
      const saved = JSON.parse(localStorage.getItem("complaints")) || [];
      setAllComplaints(saved);
      setComplaints(saved.filter((c) => c.assignedTo === loggedInStaff));
    };
    window.addEventListener("complaintsUpdated", handler);
    return () => window.removeEventListener("complaintsUpdated", handler);
  }, []);

  // Update ticket status
  const updateStatus = (id) => {
    const updated = allComplaints.map((c) => {
      if (c.id === id && c.assignedTo === loggedInStaff) {
        if (c.status === "Open") return { ...c, status: "In Progress" };
        if (c.status === "In Progress")
          return { ...c, status: "Resolved", resolvedAt: new Date().toISOString() };
      }
      return c;
    });
    setAllComplaints(updated);
    setComplaints(updated.filter((c) => c.assignedTo === loggedInStaff));
    localStorage.setItem("complaints", JSON.stringify(updated));
    window.dispatchEvent(new Event("complaintsUpdated"));
  };

  // Add staff remark
  const addRemark = (id, remarkText) => {
    if (!remarkText.trim()) return;
    const updated = allComplaints.map((c) => {
      if (c.id === id) {
        const remarks = c.remarks ? [...c.remarks] : [];
        remarks.push({
          author: loggedInStaff,
          message: remarkText.trim(),
          timestamp: new Date().toISOString(),
        });
        return { ...c, remarks, newRemark: "" };
      }
      return c;
    });
    setAllComplaints(updated);
    setComplaints(updated.filter((c) => c.assignedTo === loggedInStaff));
    localStorage.setItem("complaints", JSON.stringify(updated));
    window.dispatchEvent(new Event("complaintsUpdated"));
  };

  return (
    <div className="assigned-container">
      <h1>Assigned Complaints</h1>
      {complaints.length === 0 && <p>No assigned complaints.</p>}

      <div className="complaint-list">
        {complaints.map((c) => (
          <div
            key={c.id}
            className={`complaint-card ${c.status.replace(" ", "-").toLowerCase()}`}
          >
            <div className="complaint-header">
              <strong>{c.id}</strong> - {c.category}
            </div>
            <div className="complaint-body">
              <p><strong>Student:</strong> {c.student}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="status-text">{c.status}</span>
              </p>

              {/* Remarks display */}
              {c.remarks && c.remarks.length > 0 && (
                <div className="remarks-history">
                  <h4>Remarks:</h4>
                  {c.remarks.map((r, i) => (
                    <p key={i}>
                      <strong>{r.author}:</strong> {r.message}{" "}
                      <em>({new Date(r.timestamp).toLocaleString()})</em>
                    </p>
                  ))}
                </div>
              )}

              {/* Staff reply section */}
              {c.status === "In Progress" && (
                <div className="reply-section">
                  <textarea
                    placeholder="Add a remark..."
                    value={c.newRemark || ""}
                    onChange={(e) => {
                      const updated = complaints.map((comp) =>
                        comp.id === c.id ? { ...comp, newRemark: e.target.value } : comp
                      );
                      setComplaints(updated);
                    }}
                  />
                  <button
                    className="status-btn"
                    onClick={() => addRemark(c.id, c.newRemark || "")}
                  >
                    Save Remark
                  </button>
                </div>
              )}

              {/* Status workflow button */}
              {c.status !== "Resolved" && (
                <button
                  className="status-btn"
                  onClick={() => updateStatus(c.id)}
                >
                  {c.status === "Open" ? "Start Progress" : "Mark Resolved"}
                </button>
              )}

              {/* Resolved timestamp */}
              {c.status === "Resolved" && c.resolvedAt && (
                <div className="resolved-time">
                  Resolved At: {new Date(c.resolvedAt).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignedComplaints;