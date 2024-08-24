const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs'); // Ensure bcryptjs consistency

const dbPath = path.resolve(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Create tables if they do not exist
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS Post (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          userId INTEGER,
          FOREIGN KEY(userId) REFERENCES Users(id)
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS Comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          postId INTEGER,
          userId INTEGER,
          FOREIGN KEY(postId) REFERENCES Post(id),
          FOREIGN KEY(userId) REFERENCES Users(id)
        )
      `);
    });
  }
});

module.exports = db;
