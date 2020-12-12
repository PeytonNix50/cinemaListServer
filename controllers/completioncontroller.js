const router = require('express').Router();
const Completion = require('../db').import('../models/completion');
const validateSession = require('../middleware/validate_session');

router.get('/', (req, res) => {
    Completion.findAll()
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
});

router.get('/:owner', (req, res) => {
    Completion.findAll({
        where: { owner: req.params.owner }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "User not found"}))
});

router.post('/', validateSession, (req, res) => {
    const completionFromRequest ={
        movieName: req.body.movieName,
        rating: req.body.rating,
        notes: req.body.notes,
        owner: req.user.id
    }
    Completion.create(completionFromRequest)
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
});

router.put('/:id', (req, res) => {
    Completion.update(req.body, {
        where: { id: req.params.id }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Update not successful"}))
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Completion.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: "Item not deleted"})
    }
})

module.exports = router;