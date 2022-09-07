const express = require("express");
const { addValidation, updateValidation, validationFavorite } = require("../../middlewares/contactValidation.js");
const { tokenMiddelware } = require("../../middlewares/tokenMiddelware");
const router = express.Router();
const {
    getAllContacts,
    getOneContact,
    addContact,
    deletContact,
    updateContact,
    updateFavorite,
} = require("../../controllers/contact/contact");

router.get("/", tokenMiddelware, getAllContacts);

router.get("/:contactId", tokenMiddelware, getOneContact);

router.post("/", tokenMiddelware, addValidation, addContact);

router.delete("/:contactId", tokenMiddelware, deletContact);

router.put("/:contactId", tokenMiddelware, updateValidation, updateContact);

router.patch("/:contactId", tokenMiddelware, validationFavorite, updateFavorite);

module.exports = router;

// https://localhost:8080/api/contacts/