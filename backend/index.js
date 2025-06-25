const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/inspireallregister', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ["entrepreneur", "investor"],
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to InspireAll!');
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["entrepreneur", "investor"].includes(role)) {
    return res.status(400).send('Invalid role');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).send('User signed up successfully');
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(400).send('Error saving user: ' + error.message);
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Incorrect password');

    res.send('Login successful');
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Error logging in');
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
