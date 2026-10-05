const Contact = require("../models/Contact");

// ========================================
// CREATE CONTACT
// ========================================

const createContact = async (req, res, next) => {
  try {
    console.log("CONTACT REQUEST:", req.body);

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, subject and message are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    console.log(
      "CONTACT SAVED:",
      contact._id
    );

    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully",
      contact,
    });
  } catch (error) {
    console.error(
      "CREATE CONTACT ERROR:",
      error
    );

    next(error);
  }
};


// ========================================
// GET ALL CONTACTS
// ========================================

const getContacts = async (
  req,
  res,
  next
) => {
  try {
    const contacts =
      await Contact.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};


// ========================================
// GET CONTACT BY ID
// ========================================

const getContactById = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    next(error);
  }
};


// ========================================
// UPDATE CONTACT
// ========================================

const updateContact = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Contact updated successfully",
      contact,
    });
  } catch (error) {
    next(error);
  }
};


// ========================================
// DELETE CONTACT
// ========================================

const deleteContact = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await Contact.findByIdAndDelete(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


// ========================================
// EXPORT
// ========================================

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};