const multer = require('multer');
const path = require('path');
const Joi = require('joi');
const fs = require('fs');
const { readContacts, writeContacts } = require('../utils/contactReadWrite');
const { UPLOAD_PATH } = require('../config');

// Contact Schema
const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_PATH),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Get all the contact
function getContacts(req, res) {
  const contacts = readContacts();
  res.json(contacts.filter(contact => contact.user === req.user.username));
}

// Get a contact by Id
function getContactById(req, res) {
  const contacts = readContacts();
  const contact = contacts.find(c => c.id === req.params.id && c.user === req.user.username);
  if (!contact) return res.status(404).send('Contact not found');
  res.json(contact);
}

// Create a new contact
function createContact(req, res) {
  const { name, phone, email } = req.body;
  const { error } = contactSchema.validate({ name, phone, email });
  if (error) return res.status(400).send(error.details[0].message);

  const contacts = readContacts();
  const newContact = {
    id: Date.now().toString(),
    name,
    phone,
    email,
    photo: req.file ? req.file.path : null,
    user: req.user.username,
  };
  contacts.push(newContact);
  writeContacts(contacts);
  res.status(201).json(newContact);
}

// Update a contact
function updateContact(req, res) {
  const { name, phone, email } = req.body;
  const { error } = contactSchema.validate({ name, phone, email });
  if (error) return res.status(400).send(error.details[0].message);

  const contacts = readContacts();
  const index = contacts.findIndex(c => c.id === req.params.id && c.user === req.user.username);
  if (index === -1) return res.status(404).send('Contact not found');

  const updatedContact = { ...contacts[index], name, phone, email, photo: req.file ? req.file.path : contacts[index].photo };
  contacts[index] = updatedContact;
  writeContacts(contacts);
  res.json(updatedContact);
}

// Delete contact
function deleteContact(req, res) {
  const contacts = readContacts();
  const index = contacts.findIndex(c => c.id === req.params.id && c.user === req.user.username);
  if (index === -1) return res.status(404).send('Contact not found');


  const contact = contacts[index];
  const imagePath = contact.photo;

  // Delete the image file from the server if it exists
  if (imagePath && fs.existsSync(imagePath)) {
    fs.unlink(imagePath, (err) => {
      if (err) {
        //console.error('Failed to delete image:', err);
        return res.status(500).send('Failed to delete associated image');
      }
    });
  };

  contacts.splice(index, 1);
  writeContacts(contacts);
  res.status(204).send("Contact Deleted Succesfully");
}

module.exports = { upload, getContacts, getContactById, createContact, updateContact, deleteContact };
