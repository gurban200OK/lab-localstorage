// Auth API for the lab-localstorage lab.
//
// This backend is DONE. You (the student) do not need to change anything in this
// folder. Treat it as a black box that you talk to over HTTP from the frontend.
//
// It exposes two endpoints:
//   POST /signup  -> creates a user in memory
//   POST /login   -> checks the credentials and hands back a JWT

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5005;

// In a real app this lives in an environment variable and is a long random
// string. For a lab on the browser side, a hardcoded secret is fine.
const JWT_SECRET = "ironhack-super-secret-do-not-ship-this";

// Let the browser (running on http://localhost:3000) call us, and parse JSON
// request bodies into req.body.
app.use(cors());
app.use(express.json());

// Our "database". It resets every time you restart the server, which is exactly
// what we want for a lab: sign up again whenever you need a fresh user.
const users = [];

// POST /signup
// Body: { email, password }
// Creates the user. Does NOT log them in and does NOT return a token.
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const alreadyExists = users.find((user) => user.email === email);
  if (alreadyExists) {
    return res.status(409).json({ message: "That email is already registered." });
  }

  users.push({ email, password });
  console.log(`New user signed up: ${email} (total users: ${users.length})`);

  return res.status(201).json({ message: "User created. You can log in now." });
});

// POST /login
// Body: { email, password }
// On success returns { token } where token is a signed JWT.
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // The payload is what gets baked into the token. Never put the password in here.
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log(`Auth API listening on http://localhost:${PORT}`);
});
