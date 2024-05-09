const db = require('../db');

module.exports = {
    getAllCommentsForPost: (postId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM comments WHERE post_id = ?', [postId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },

    createComment: (postId, content) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO comments (post_id, content) VALUES (?, ?)', [postId, content], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },

    updateComment: (id, content) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE comments SET content = ? WHERE id = ?', [content, id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    },

    deleteComment: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM comments WHERE id = ?', [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
};
