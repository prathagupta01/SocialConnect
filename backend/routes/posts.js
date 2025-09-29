const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const auth = require('../middleware/auth');

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const { content, image } = req.body;
    const user_id = req.user.id;
    
    const post = await Post.create({ user_id, content, image });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get feed posts
router.get('/feed', auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const posts = await Post.findFeed(user_id);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check user owns post
    if (post.user_id !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await Post.delete(req.params.id);
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;