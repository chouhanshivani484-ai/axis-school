import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const adminModules = [
  {
    title: "Admissions",
    icon: "🎓",
    path: "/admin/admissions",
    description: "Manage student admissions",
  },
  {
    title: "Students",
    icon: "👨‍🎓",
    path: "/admin/students",
    description: "Manage all students",
  },
  {
    title: "Teachers",
    icon: "👩‍🏫",
    path: "/admin/teachers",
    description: "Manage teachers",
  },
  {
    title: "Attendance",
    icon: "📋",
    path: "/admin/attendance",
    description: "Manage student attendance",
  },
  {
    title: "Fees",
    icon: "💰",
    path: "/admin/fees",
    description: "Manage student fees",
  },
  {
    title: "Results",
    icon: "📊",
    path: "/admin/results",
    description: "Manage examination results",
  },
  {
    title: "Notices",
    icon: "📢",
    path: "/admin/notices",
    description: "Manage school notices",
  },
  {
    title: "Events",
    icon: "📅",
    path: "/admin/events",
    description: "Manage school events",
  },
  {
    title: "Messages",
    icon: "💬",
    path: "/admin/messages",
    description: "View contact messages",
  },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>AXIS School</h1>
          <p>Admin Dashboard</p>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <span>Admin</span>
          </div>
        </div>
      </header>

      {/* Welcome */}
      <section className="admin-welcome">
        <h2>Welcome, Administrator 👋</h2>
        <p>
          Manage your school information, students, teachers,
          attendance, fees, events and more from here.
        </p>
      </section>

      {/* Statistics */}
      <section className="admin-stats">

        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div>
            <h3>Students</h3>
            <p>Manage Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👩‍🏫</div>
          <div>
            <h3>Teachers</h3>
            <p>Manage Teachers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div>
            <h3>Attendance</h3>
            <p>Track Attendance</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div>
            <h3>Events</h3>
            <p>Manage Events</p>
          </div>
        </div>

      </section>

      {/* Modules */}
      <section className="admin-section">

        <div className="section-heading">
          <h2>Administration</h2>
          <p>Select a module to manage school data.</p>
        </div>

        <div className="admin-grid">

          {adminModules.map((module) => (
            <Link
              to={module.path}
              className="admin-module-card"
              key={module.title}
            >
              <div className="module-icon">
                {module.icon}
              </div>

              <div className="module-content">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>

              <span className="module-arrow">
                →
              </span>
            </Link>
          ))}

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;