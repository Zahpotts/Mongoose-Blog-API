const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Adjust the path as necessary


router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => res.status(200).json(blogs))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/featured', (req, res) => {
    Blog
        .where({ feature: true })
        .then(blogs => res.status(200).json(blogs))
        .catch(err => res.status(500).json({ error: err.message }));
});
router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(blog);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
router.post('/', (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog
        .save()
        .then(blog => res.status(201).json(blog))
        .catch(err => res.status(500).json({ error: err.message }));
});
router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(blog => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(blog);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndDelete(req.params.id)
        .then(blog => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ message: 'Blog deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
module.exports = router;