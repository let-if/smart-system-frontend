
import { useState, useEffect } from "react";
import "./ComplaintSubmission.css";

function ComplaintSubmission() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    if (!loggedInUser) {
      alert("Please login to submit complaints");
      return;
    }

    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [
      { id: 1, name: "Dormitory" },
      { id: 2, name: "Laboratory" },
      { id: 3, name: "Internet" },
      { id: 4, name: "Classroom" },
      { id: 5, name: "Other" },
    ];

    setCategories(savedCategories);
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }, [loggedInUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCategory || !complaint.trim() || !title.trim())
      return alert("Please fill all fields");

    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    // Keep duplicate check per student
    if (
      savedComplaints.some(
        (c) => c.title === title && c.student === loggedInUser.id
      )
    ) {
      return alert("You already submitted a complaint with this title");
    }

    const newComplaint = {
      id: Date.now(),
      student: loggedInUser.id, // KEEP THIS for tracking page
      title: title.trim(),
      category: selectedCategory,
      description: complaint.trim(),
      priority,
      status: "Open",
      assignedTo: "staff001",
      date: new Date().toISOString(),
      remarks: [],
      acceptedByStudent: false,
    };

    savedComplaints.push(newComplaint);
    localStorage.setItem("complaints", JSON.stringify(savedComplaints));
    window.dispatchEvent(new Event("complaintsUpdated"));

    alert("Complaint submitted successfully!");

    setComplaint("");
    setSelectedCategory("");
    setTitle("");
    setPriority("Low");
  };

  // Only block if no user at all (NOT role-based anymore)
  if (!loggedInUser) return null;

  return (
    <div className="submission-container">
      <h2>Submit Your Complaint</h2>
      <form className="submission-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <textarea
          placeholder="Write your complaint..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          rows={5}
        />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default ComplaintSubmission;