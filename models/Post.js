// models/Post.js
const db = require('../db');

module.exports = {
    getAllPosts: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM posts', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getPostById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM posts WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    createPost: (title, content) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },

    updatePost: (id, title, content) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    },

    deletePost: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM posts WHERE id = ?', [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
};
