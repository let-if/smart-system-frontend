import { Outlet, Link } from "react-router-dom";

function DashboardLayout({ role }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#1e293b", color: "white", padding: "20px" }}>
        <h2>{role.toUpperCase()} PANEL</h2>
        <nav>
          <ul>
            <li><Link to={`/${role}/dashboard`} style={{ color: "white" }}>Dashboard</Link></li>
            <li><Link to={`/${role}/profile`} style={{ color: "white" }}>Profile</Link></li>
            <li><Link to={`/${role}/courses`} style={{ color: "white" }}>Courses</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* This is where StudentDashboard, Profile, etc. will render */}
      </div>
    </div>
  );
}

export default DashboardLayout;