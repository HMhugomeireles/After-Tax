const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user=> {

            // verify if the user exists
            if(user.length >= 1){
                // 409 conflict
                return res.status(409).json({
                    message: 'Email exists.'
                })
            }

            bcrypt.hash('req.body.password', 11, (err, hash) => {
        
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
        
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })
        
                // store in mongoDB
                user.save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: 'User created'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
        
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});




module.exports = router;