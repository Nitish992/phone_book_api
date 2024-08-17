const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { readUsers, writeUsers } = require('../utils/userReadWrite');
const { JWT_SECRET } = require('../config');

// User schema
const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

// Sign up a new user
async function signup(req, res) {
  const { username, password, email } = req.body;
  const { error } = userSchema.validate({ username, password, email });
  if (error) return res.status(400).send(error.details[0].message);

  const users = readUsers();
  if (users.find(user => user.username === username)) {
    return res.status(400).send('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword, email };
  users.push(newUser);
  writeUsers(users);

  res.status(201).send('User registered');
}

// Login a user
async function signin(req, res) {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = { signup, signin };
