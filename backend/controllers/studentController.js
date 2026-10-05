const Student = require("../models/Student");

// ===============================
// CREATE STUDENT
// ===============================
const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      className,
      section,
      rollNumber,
      parentName,
      parentPhone,
      address,
      dateOfBirth,
      admissionDate,
      status,
    } = req.body;

    // Required fields
    if (!name || !email || !className) {
      return res.status(400).json({
        success: false,
        message: "Name, email and class are required",
      });
    }

    // Check duplicate email
    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists with this email",
      });
    }

    // Create student
    const student = await Student.create({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      className,
      section: section || "",
      rollNumber: rollNumber || "",
      parentName: parentName || "",
      parentPhone: parentPhone || "",
      address: address || "",
      dateOfBirth: dateOfBirth || null,
      admissionDate: admissionDate || Date.now(),
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL STUDENTS
// ===============================
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// ===============================
// GET SINGLE STUDENT
// ===============================
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("GET STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

// ===============================
// UPDATE STUDENT
// ===============================
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
};

// ===============================
// DELETE STUDENT
// ===============================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};