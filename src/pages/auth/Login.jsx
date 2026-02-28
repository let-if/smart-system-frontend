
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();
//   const [ugr, setUgr] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault(); // prevent page reload

//     if (!ugr || !password) {
//       setError("Please enter UGR and Password");
//       return;
//     }

//     // Save user info to localStorage
//     localStorage.setItem("user", JSON.stringify({ ugr, role }));

//     // Redirect based on role
//     if (role === "student") navigate("/student/dashboard");
//     else if (role === "staff") navigate("/staff/dashboard");
//     else if (role === "admin") navigate("/admin/dashboard");
//   };

//   return (
//     <div className="div1">
//       <form className="form" onSubmit={handleLogin}>
//         {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

//         <input
//           type="text"
//           placeholder="UGR"
//           className="input"
//           value={ugr}
//           onChange={(e) => setUgr(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <select
//           className="input"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           style={{ marginBottom: "10px" }}
//         >
//           <option value="student">Student</option>
//           <option value="staff">Staff</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button type="submit" className="button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // single css file

function Login() {
  const navigate = useNavigate();

  // toggle between login & register
  const [isRegister, setIsRegister] = useState(false);

  // register states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("student");

  // login states
  const [ugr, setUgr] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  // ================= REGISTER =================
  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !regPassword)
      return alert("Please fill all fields");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      return alert("Email already registered");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: regPassword,
      role: regRole,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    setIsRegister(false); // switch to login
  };

  // ================= LOGIN =================
  const handleLogin = (e) => {
    e.preventDefault();

    if (!ugr || !password) {
      setError("Please enter UGR and Password");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ ugr, role }));

    if (role === "student") navigate("/student/dashboard");
    else if (role === "staff") navigate("/staff/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
      
      {/* LOGIN FORM */}
      {!isRegister && (
        <div className="div1">
          <form className="form" onSubmit={handleLogin}>
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </p>
            )}

            <input
              type="text"
              placeholder="UGR"
              className="input"
              value={ugr}
              onChange={(e) => setUgr(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginBottom: "10px" }}
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="button">
              Submit
            </button>

            <p
              style={{ cursor: "pointer", textAlign: "center" ,color:"white",paddingBottom:"10px"}}
              onClick={() => setIsRegister(true)}
            >
              Don't have an account? Register
            </p>
          </form>
        </div>
      )}

      {/* REGISTER FORM */}
      {isRegister && (
        <div className="register-container">
          <h2>Register</h2>
          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />

            <select
              value={regRole}
              onChange={(e) => setRegRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">Register</button>

            <p
              style={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => setIsRegister(false)}
            >
              Already have an account? Login
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;