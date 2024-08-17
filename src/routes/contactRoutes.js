const express = require('express');
const router = express.Router();
const { upload, getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/contacts', getContacts);
router.get('/contacts/:id', getContactById);
router.post('/contacts', upload.single('photo'), createContact);
router.put('/contacts/:id', upload.single('photo'), updateContact);
router.delete('/contacts/:id', deleteContact);

module.exports = router;
