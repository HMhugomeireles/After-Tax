const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Unmarried = require('../models/unmarried');


router.get('/', (req, res, next) => {
    Unmarried.find()
        .exec()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:tier', (req, res, next) => {
    res.status(200).json({
        message: 'get all tax of this range'
    })
});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Unmarried.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        });
});


router.post('/', (req, res, next) => {
    const unmarried = new Unmarried({
        _id: new mongoose.Types.ObjectId(),
        tier: req.body.tier,
        children0: req.body.children0,
        children1: req.body.children1,
        children2: req.body.children2,
        children3: req.body.children3,
        children4: req.body.children4,
        children5: req.body.children5
    });
    unmarried.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Post done.',
                insert: unmarried
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
})


router.put('/:tier', (req, res, next) => {
    res.status(200).json({
        message: 'update tier'
    })
})


module.exports = router;