const { readDB, writeDB } = require("../models/db");

function getMessages(req, res) {
  const { userId, otherId } = req.params;
  const db = readDB();
  const msgs = db.messages.filter(
    (m) =>
      (m.from === userId && m.to === otherId) ||
      (m.from === otherId && m.to === userId),
  );
  res.json(msgs);
}

function markRead(req, res) {
  const { userId, fromId } = req.body;
  const db = readDB();
  db.messages = db.messages.map((m) =>
    m.from === fromId && m.to === userId && !m.isRead
      ? { ...m, isRead: true }
      : m,
  );
  writeDB(db);
  res.json({ ok: true });
}

module.exports = { getMessages, markRead };
