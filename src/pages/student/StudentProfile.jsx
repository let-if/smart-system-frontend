
import { useState, useEffect } from "react";
import "./StudentProfile.css";

function StudentProfile() {
  // Load saved data from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user")) || {};

  // State for editable fields
  const [fullName, setFullName] = useState(savedUser.fullName || "");
  const [ugr, setUgr] = useState(savedUser.ugr || "");
  const [email, setEmail] = useState(savedUser.email || "");
  const [contact, setContact] = useState(savedUser.contact || "");
  const [address, setAddress] = useState(savedUser.address || "");
  const [message, setMessage] = useState("");

  // Save updated info back to localStorage
  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...savedUser,
      fullName,
      ugr,
      email,
      contact,
      address,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="div2">
      <h1 className="h1">Student Profile</h1>

      {/* Profile Image */}
      <img
        src="/profile.jpg" // Replace with actual image path
        alt="Profile"
        className="profile-image"
      />

      {/* Editable Form */}
      <form className="profile-form" onSubmit={handleSave}>
        {message && <p className="success-message">{message}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="UGR"
          value={ugr}
          onChange={(e) => setUgr(e.target.value)}
          className="input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input"
        />

        <button type="submit" className="button">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default StudentProfile;