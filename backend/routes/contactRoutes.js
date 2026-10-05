const express = require("express");

const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

// ========================================
// CREATE CONTACT
// POST /api/contacts
// ========================================

router.post("/", createContact);

// ========================================
// GET ALL CONTACTS
// GET /api/contacts
// ========================================

router.get("/", getContacts);

// ========================================
// GET SINGLE CONTACT
// GET /api/contacts/:id
// ========================================

router.get("/:id", getContactById);

// ========================================
// UPDATE CONTACT
// PUT /api/contacts/:id
// ========================================

router.put("/:id", updateContact);

// ========================================
// DELETE CONTACT
// DELETE /api/contacts/:id
// ========================================

router.delete("/:id", deleteContact);

module.exports = router;