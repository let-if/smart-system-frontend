
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/auth/Login";

// // Student Pages
// import StudentDashboard from "./pages/student/StudentDashboard";
// import StudentProfile from "./pages/student/StudentProfile";
// import Courses from "./pages/student/Courses";
// import Grades from "./pages/student/Grades";
// import ComplaintSubmission from "./pages/student/ComplaintSubmission";
// import ComplaintTracking from "./pages/student/ComplaintTracking";

// // Staff Pages
// import StaffDashboard from "./pages/staff/StaffDashboard";
// import AssignedComplaints from "./pages/staff/AssignedComplaints";

// // Admin Pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminCategories from "./pages/admin/AdminCategories";

// import ProtectedRoute from "./components/ProtectedRoute";
// import LoginSimulation from "./components/LoginSimulation";
// import SaveFooter from "./components/Footer";
// function App() {
//   return (
//     <Routes>
//       {/* Default Route */}
//       <Route path="/" element={<Navigate to="/login" />} />

//       {/* Single Auth Page (Login + Register Together) */}
//       <Route path="/login" element={<Login />} />

//       {/* <Route path="/simulate-login" element={<LoginSimulation />} /> */}

//       {/* Student Routes */}
//       <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
//         <Route path="/student/dashboard" element={<StudentDashboard />} />
//         <Route path="/student/profile" element={<StudentProfile />} />
//         <Route path="/student/courses" element={<Courses />} />
//         <Route path="/student/grades" element={<Grades />} />
//         <Route path="/student/complaint/submit" element={<ComplaintSubmission />} />
//         <Route path="/student/complaint/tracking" element={<ComplaintTracking />} />
//       </Route>

//       {/* Staff Routes */}
//       <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
//         <Route path="/staff/dashboard" element={<StaffDashboard />} />
//         <Route path="/staff/assigned-complaints" element={<AssignedComplaints />} />
//       </Route>

//       {/* Admin Routes */}
//       <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/users" element={<AdminUsers />} />
//         <Route path="/admin/categories" element={<AdminCategories />} />
//       </Route>

//       {/* Catch-all */}
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App;
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Courses from "./pages/student/Courses";
import Grades from "./pages/student/Grades";
import ComplaintSubmission from "./pages/student/ComplaintSubmission";
import ComplaintTracking from "./pages/student/ComplaintTracking";

// Staff Pages
import StaffDashboard from "./pages/staff/StaffDashboard";
import AssignedComplaints from "./pages/staff/AssignedComplaints";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer"; // 👈 normal footer (not SaveFooter)

function App() {
  const location = useLocation();

  // Hide footer on login page
  const hideFooter = location.pathname === "/login";

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Student */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/courses" element={<Courses />} />
          <Route path="/student/grades" element={<Grades />} />
          <Route path="/student/complaint/submit" element={<ComplaintSubmission />} />
          <Route path="/student/complaint/tracking" element={<ComplaintTracking />} />
        </Route>

        {/* Staff */}
        <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/assigned-complaints" element={<AssignedComplaints />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Show Footer only if not login */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;