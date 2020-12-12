const router = require('express').Router();
const Planning = require('../db').import('../models/planning');
const validateSession = require('../middleware/validate_session');

router.get('/', (req, res) => {
    Planning.findAll()
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
});

router.get('/:owner', (req, res) => {
    Planning.findAll({
        where: { owner: req.params.owner }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "User not found"}))
})

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

router.put('/:id', (req,res) => {
    Planning.update(req.body, {
        where: { id: req.params.id }
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: "Update not successful"}))
});

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