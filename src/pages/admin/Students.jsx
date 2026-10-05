import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    className: "",
    section: "",
    rollNumber: "",
    parentName: "",
    parentPhone: "",
    address: "",
    dateOfBirth: "",
    admissionDate: "",
  });

  // =========================
  // GET STUDENTS
  // =========================
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/students`);
      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error("Fetch students error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD STUDENT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add student");
        return;
      }

      alert("Student added successfully ✅");

      setFormData({
        name: "",
        email: "",
        phone: "",
        className: "",
        section: "",
        rollNumber: "",
        parentName: "",
        parentPhone: "",
        address: "",
        dateOfBirth: "",
        admissionDate: "",
      });

      fetchStudents();
    } catch (error) {
      console.error("Add student error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1>Students Management</h1>
      <p>Add and manage school students.</p>

      {/* FORM */}

      <div style={styles.card}>
        <h2>Add New Student</h2>

        <form onSubmit={handleSubmit}>

          <div style={styles.grid}>

            <input
              name="name"
              placeholder="Student Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              name="className"
              placeholder="Class *"
              value={formData.className}
              onChange={handleChange}
              required
            />

            <input
              name="section"
              placeholder="Section"
              value={formData.section}
              onChange={handleChange}
            />

            <input
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
            />

            <input
              name="parentName"
              placeholder="Parent Name"
              value={formData.parentName}
              onChange={handleChange}
            />

            <input
              name="parentPhone"
              placeholder="Parent Phone"
              value={formData.parentPhone}
              onChange={handleChange}
            />

            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <input
              name="admissionDate"
              type="date"
              value={formData.admissionDate}
              onChange={handleChange}
            />

          </div>

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Saving..." : "Add Student"}
          </button>

        </form>
      </div>

      {/* STUDENTS LIST */}

      <div style={styles.card}>
        <h2>Students List</h2>

        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>

            <table style={styles.table}>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Roll No.</th>
                  <th>Parent</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.className}</td>
                    <td>{student.section || "-"}</td>
                    <td>{student.rollNumber || "-"}</td>
                    <td>{student.parentName || "-"}</td>
                    <td>{student.status}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  card: {
    background: "#fff",
    padding: "25px",
    marginTop: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
  },

  input: {
    padding: "12px",
  },

  textarea: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    boxSizing: "border-box",
  },

  button: {
    marginTop: "15px",
    padding: "12px 25px",
    border: "none",
    borderRadius: "7px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default Students;