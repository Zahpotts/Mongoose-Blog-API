const express = require('express');
const router = express.Router();
const User = require('../models/User') // Adjust the path as necessary

router.get('/', (req, res) => {
    User
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});
router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser
        .save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});
router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).end;
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
router.delete('/:id', (req, res) => {
    User
        .findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;