const db = require('../config/db');

class Post {
  static create(postData) {
    return new Promise((resolve, reject) => {
      const { user_id, content, image } = postData;
      const sql = `INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)`;
      db.run(sql, [user_id, content, image], function(err) {
        if (err) reject(err);
        resolve({ id: this.lastID, user_id, content, image });
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT p.*, u.username, u.avatar 
        FROM posts p 
        JOIN users u ON p.user_id = u.id 
        ORDER BY p.created_at DESC
      `;
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static findFeed(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT p.*, u.username, u.avatar 
        FROM posts p 
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id IN (
          SELECT following_id FROM follows WHERE follower_id = ?
        )
        ORDER BY p.created_at DESC
      `;
      db.all(sql, [userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT p.*, u.username, u.avatar 
        FROM posts p 
        JOIN users u ON p.user_id = u.id 
        WHERE p.id = ?
      `;
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM posts WHERE id = ?`;
      db.run(sql, [id], function(err) {
        if (err) reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Post;