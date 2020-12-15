const router = require('express').Router();
const Planning = require('../db').import('../models/planning');
const validateSession = require('../middleware/validate_session');

// GET request for all planning data
router.get('/', (req, res) => {
    Planning.findAll()
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
});

// GET request to display user data on their "personal" page
router.get('/:owner', (req, res) => {
    Planning.findAll({
        where: { owner: req.params.owner }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "User not found"}))
})

// POST request so users can add films to their list (will input movie name data from 3rd party api on front end)
router.post('/', validateSession, (req, res) => {
    const planningFromRequest ={
        movieName: req.body.movieName,
        interest: req.body.interest,
        progress: req.body.progress,
        owner: req.user.id
    }
    Planning.create(planningFromRequest)
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
});

// PUT request for users to edit their planning list
router.put('/:id', (req,res) => {
    Planning.update(req.body, {
        where: { id: req.params.id }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Update not successful"}))
});

// DELETE request for users to delete items from their planning list (will delete then post to completion list if user marks as complete on front end)
router.delete('/:id', async (req, res) => {
    try {
        const result = await Planning.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: "Item not deleted"})
    }
});



module.exports = router;