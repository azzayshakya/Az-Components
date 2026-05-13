const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { readDB, writeDB } = require("../models/db");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

async function register(req, res) {
  const { username, email, password } = req.body;

  const db = readDB();

  if (db.users.find((u) => u.username === username)) {
    return res.status(400).json({
      error: "Username already taken",
    });
  }

  if (db.users.find((u) => u.email === email)) {
    return res.status(400).json({
      error: "Email already registered",
    });
  }

  const hash = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  );

  const user = {
    id: Date.now().toString(),

    username,

    email,

    passwordHash: hash,

    role: "user",

    isOnline: false,

    lastSeen: null,

    createdAt: new Date().toISOString(),
  };

  db.users.push(user);

  writeDB(db);

  const token = generateToken(user);

  res.json({
    data: {
      token: token,

      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isOnline: true,
        lastSeen: user.lastSeen,
      },
    },
  });
}

async function login(req, res) {
  const { identity, password } = req.body;

  const db = readDB();

  const user = db.users.find(
    (u) => u.username === identity || u.email === identity,
  );

  if (!user) {
    return res.status(401).json({
      error: "User not found",
    });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);

  if (!ok) {
    return res.status(401).json({
      error: "Wrong password",
    });
  }

  user.isOnline = true;

  writeDB(db);

  const token = generateToken(user);

  res.json({
    data: {
      token: token,

      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isOnline: true,
        lastSeen: user.lastSeen,
      },
    },
  });
}

function checkUsername(req, res) {
  const db = readDB();

  res.json({
    available: !db.users.find((u) => u.username === req.params.username),
  });
}

function checkEmail(req, res) {
  const db = readDB();

  res.json({
    available: !db.users.find((u) => u.email === req.params.email),
  });
}

module.exports = {
  register,
  login,
  checkUsername,
  checkEmail,
};
