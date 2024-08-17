const fs = require('fs');
const path = require('path');

const contactFilePath = path.join(__dirname, '../../data/contacts.json');

// For reading contacts to json file
function readContacts() {
  return JSON.parse(fs.readFileSync(contactFilePath, 'utf8'));
}

// For writing contacts to json file
function writeContacts(contacts) {
  fs.writeFileSync(contactFilePath, JSON.stringify(contacts, null, 2));
}

module.exports = { readContacts, writeContacts };
