
# 🎓 ASTU Smart Complaint & Issue Tracking System

A modern **role-based complaint management platform** built using **React.js** for Adama Science and Technology University (ASTU).

This project is the **frontend implementation** of an AI-powered full-stack Complaint & Issue Tracking System designed to improve communication between Students, Staff, and Administration.

---

## 🚀 Project Overview

The ASTU Smart Complaint & Issue Tracking System is a centralized platform where:

- Students can submit and track complaints
- Staff can manage and respond to assigned issues
- Admins can monitor system performance and manage users/categories
- AI chatbot assists students with questions and guidance

This version is the **frontend system built with React**, designed to integrate with a future AI-powered backend.

---

## 🔐 Authentication System

- Single-page **Login & Registration**
- Role-based access:
  - 👨‍🎓 Student
  - 👨‍🏫 Staff
  - 👨‍💼 Admin
- Protected routes using custom `ProtectedRoute`
- LocalStorage-based authentication (for frontend simulation)

If a user is not registered, they can click **Register** and create an account by selecting their role.

---

# 👨‍🎓 Student Features

After selecting **Student**, the system provides:

### 📌 Student Dashboard
- Overview of activities and complaint status

### 👤 Student Profile
- Personal information display

### 📚 Courses & Grades (Dynamic)
- Dynamically displayed student courses
- Grade tracking system

### 📝 Complaint Submission
- Submit new complaints
- Select complaint category
- Provide detailed description

### 📊 Track Complaints
- View submitted complaints
- Monitor complaint status (Open / In Progress / Resolved)

### 🤖 AI Chatbot Assistant
- Students can ask questions
- AI provides automated guidance and support
- Designed to be fully AI-powered in future full-stack version

---

# 👨‍🏫 Staff Features

After selecting **Staff**, the system provides:

### 📌 Staff Dashboard
Displays complaint statistics:
- Open Tickets
- In Progress Tickets
- Resolved Tickets

Ticket counts automatically update when status changes.

### 📂 View Assigned Complaints
- Staff can view complaints assigned to them
- Reply to complaints
- Update complaint status

---

# 👨‍💼 Admin Features

After selecting **Admin**, the system provides:

### 📊 Admin Dashboard
- Total complaints
- Most common complaint category
- Complaint resolution rate

### 👥 Manage Users
Admin can:
- Add Students
- Add Staff
- Add Admins
- Manage system users freely

### 🗂 Manage Categories
Admin can:
- Add complaint categories
- Remove complaint categories
- Control available complaint types for students

---

# 🛠️ Technologies Used

- React.js
- React Router DOM
- JavaScript (ES6)
- CSS3 (Custom styling & animations)
- LocalStorage (authentication simulation)

---

# 🏗️ System Architecture (Frontend)

---

# 🔄 Role-Based Routing

| Role     | Accessible Pages |
|----------|------------------|
| Student  | Dashboard, Profile, Courses, Grades, Submit Complaint, Track Complaint |
| Staff    | Dashboard, Assigned Complaints |
| Admin    | Dashboard, Manage Users, Manage Categories |

Unauthorized users are automatically redirected to the login page.

---

# 🤖 Future Full-Stack & AI Vision

This frontend is designed to evolve into a full-stack AI-powered system with:

- Node.js / Express backend
- MongoDB database
- JWT authentication
- AI-powered chatbot using NLP
- Real-time complaint tracking
- Analytics dashboard
- Smart complaint categorization using AI

---

# ▶️ How To Run The Project

1. Clone the repository

2. Install dependencies

3. Start development server

4. Open in browser

---

# 🎯 Project Objectives

- Improve complaint management efficiency at ASTU
- Reduce communication gaps between students and administration
- Provide real-time complaint tracking
- Implement AI-assisted student support
- Build scalable full-stack system architecture

---

# 📌 Educational Purpose

This project is developed as a **Frontend University Project** demonstrating:

- Role-based authentication
- Protected routing
- State management
- UI/UX design
- System architecture planning
- AI integration planning

---

# 👨‍💻 Developer

Abdulletif ylkal 
Adama Science and Technology University (ASTU)  
Software Engineering  
3rd year

---

# 📄 License

This project is developed for academic purposes.
