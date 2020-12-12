const router = require('express').Router();
const User = require('../db').import('../models/user');
const {Op} = require('sequelize');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        isAdmin: req.body.isAdmin
    })
    .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            user: user,
            message: 'User Created!',
            sessionToken: token
        });
    })
    .catch(err => res.status(500).json({error: err}));
});

router.post('/login', (req, res) => {
    User.findOne({ where: { email: req.body.email }})
    .then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if (matches) {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d"});

                    res.status(200).json({
                        user: user,
                        message: "Successfully Logged In!",
                        sessionToken: token
                    })

                } else {
                    res.status(500).json({ error: "Password is Incorrect" })
                }
            })


        } else {
            res.status(500).json({ error: "User doesn't exist" })
        }
    })
    .catch(err => res.status(500).json({ error: "Database Error" }))
});

router.delete('/deleteuser', async (req, res) => {
    try {
        const result = await User.destroy({
            where: {id: req.params.id}
        });

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: "User not deleted"})
    }
});

router.get('/:username', (req, res) => {
    User.findAll({
        where: {
            username: {
                [Op.iLike]: '%' + req.params.username + '%'
            }
        }
    })
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({error: err}))
});


module.exports = router;