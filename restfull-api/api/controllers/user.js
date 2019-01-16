const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../configs/config_dev').jwtKey;
const salt = bcrypt.genSaltSync();

const User = require('../models/user');

exports.newUser = (req, res, next) => {
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

            bcrypt.hash(req.body.password, salt, (err, hash) => {

                if (err) {
                    return res.status(500).json({
                        error: er
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

}



exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user=> {

            if(user.length < 1){
                // 409 conflict
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, verify) => {
                
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if(verify){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, JWT_KEY, {
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }

                res.status(401).json({
                    message: 'Auth failed'
                });

            })

        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'Auth failed'
            })
        })
}