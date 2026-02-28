// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";

// function Register() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !email || !password) return alert("Please fill all fields");

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     if (users.some(u => u.email === email)) {
//       return alert("Email already registered");
//     }

//     const newUser = {
//       id: Date.now(),
//       name,
//       email,
//       password,
//       role
//     };

//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));

//     alert("Registration successful!");
//     navigate("/login"); // redirect to login page
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form className="register-form" onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           placeholder="Full Name" 
//           value={name} 
//           onChange={e => setName(e.target.value)} 
//           required 
//         />
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={email} 
//           onChange={e => setEmail(e.target.value)} 
//           required 
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={e => setPassword(e.target.value)} 
//           required 
//         />

//         <select value={role} onChange={e => setRole(e.target.value)}>
//           <option value="student">Student</option>
//           <option value="staff">Staff</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;