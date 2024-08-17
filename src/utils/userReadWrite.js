const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../../data/users.json');

// For reading users to json file
function readUsers() {
  return JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
}

// For writing users to json file
function writeUsers(users) {
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
}

module.exports = { readUsers, writeUsers };
