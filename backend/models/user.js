const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static create(userData) {
    return new Promise((resolve, reject) => {
      const { username, email, password } = userData;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(sql, [username, email, hash], function(err) {
          if (err) reject(err);
          resolve({ id: this.lastID, username, email });
        });
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE email = ?`;
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, username, email, avatar, bio, created_at FROM users WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;