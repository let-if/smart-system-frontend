
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ fullName: "", email: "", role: "student" });

  // Load users from localStorage or dummy data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("users")) || [
      { id: "UGR001", fullName: "Alice Johnson", email: "alice@student.com", role: "student" },
      { id: "UGR002", fullName: "Bob Smith", email: "bob@staff.com", role: "staff" },
      { id: "ADM001", fullName: "Admin One", email: "admin@astu.com", role: "admin" },
    ];
    setUsers(saved);
  }, []);

  // Add new user
  const addUser = () => {
    if (!newUser.fullName || !newUser.email) return;
    const id = newUser.role.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 999);
    const updated = [...users, { ...newUser, id }];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setNewUser({ fullName: "", email: "", role: "student" });
  };

  // Delete user
  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className="admin-users-container">

      {/* Navigation */}
      <nav className="admin-nav">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/categories">Manage Categories</Link>
      </nav>

      <h1>Manage Users</h1>

      {/* Add new user form */}
      <div className="add-user-form">
        <input
          placeholder="Full Name"
          value={newUser.fullName}
          onChange={e => setNewUser({ ...newUser, fullName: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Users table */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminUsers;