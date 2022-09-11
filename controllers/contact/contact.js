const ContactModel = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  const isFavorite = req.query.favorite ? [true, false] : true;

  // можно проверить указал ли юзер страницу и если нет то не добавлять в поиск базы skip
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const allContacts = await ContactModel.find(
      { owner: req.userId, favorite: isFavorite },
      { skip: skip, limit: limit }
    );
    return res
      .status(200)
      .json({ message: "status 200", response: allContacts });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Contacts not found`, response: null, error: error });
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const contactByID = await ContactModel.findOne({
      _id: req.params.contactId,
    });
    return res
      .status(200)
      .json({ message: "status 200", response: contactByID });
  } catch (error) {
    return res.status(404).json({
      message: `Contact ${req.params.contactId} not found`,
      response: null,
      error: error,
    });
  }
};

const getFavoriteContact = async (req, res, next) => {
  try {
    const contactsFavorite = await ContactModel.find({
      owner: req.userId,
      favorite: true,
    });
    return res
      .status(200)
      .json({ message: "status 200", response: contactsFavorite });
  } catch (error) {
    return res.status(404).json({
      message: `Contact ${req.params.contactId} not found`,
      response: null,
      error: error,
    });
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = new ContactModel({ ...req.body, owner: req.userId });
    const newContact = await contact.save(contact);
    return res
      .status(200)
      .json({ message: "status 201", response: newContact });
  } catch (error) {
    return res.status(404).json({
      message: "Contact not created, i am sorry try again",
      response: null,
      error: error,
    });
  }
};

const deletContact = async (req, res, next) => {
  try {
    const removeContact = await ContactModel.findByIdAndDelete({
      _id: req.params.contactId,
    });
    return res
      .status(204)
      .json({ message: "status 204", response: removeContact });
  } catch (error) {
    return res.status(404).json({
      message: `Contact ${req.params.contactId} not found`,
      response: null,
      error: error,
    });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const editContact = await ContactModel.findByIdAndUpdate(
      { _id: req.params.contactId },
      { ...req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "status 200", response: editContact });
  } catch (error) {
    return res.status(404).json({
      message: `Contact ${req.params.contactId} not found`,
      response: null,
      error: error,
    });
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const editContact = await ContactModel.findByIdAndUpdate(
      { _id: req.params.contactId },
      { ...req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "status 200", response: editContact });
  } catch (error) {
    return res.status(404).json({
      message: `Contact ${req.params.contactId} not found`,
      response: null,
      error: error,
    });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  getFavoriteContact,
  addContact,
  deletContact,
  updateContact,
  updateFavorite,
};
