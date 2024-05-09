const Comment = require('../models/Comment');

exports.getAllCommentsForPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.getAllCommentsForPost(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    try {
        const commentId = await Comment.createComment(postId, content);
        res.status(201).json({ id: commentId, message: 'Comment created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    try {
        await Comment.updateComment(id, content);
        res.json({ message: 'Comment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await Comment.deleteComment(id);
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
