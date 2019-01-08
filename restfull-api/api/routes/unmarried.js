const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Unmarried = require('../models/unmarried');


router.get('/', (req, res, next) => {
    Unmarried.find()
        .select('-__v -createdAt')
        .exec()
        .then(list => {
            const response = {
                count: list.length,
                tiers: list.map(lis => {
                    return {
                        id: lis.id,
                        tier: lis.tier,
                        childrens: [
                            lis.children0,
                            lis.children1,
                            lis.children2,
                            lis.children3,
                            lis.children4,
                            lis.children5
                        ],
                        request: {
                            type: 'GET',
                            url: 'http://' + req.headers.host + '/unmarried/' + lis.id
                        },
                        updateAt: list.updateAt
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Unmarried.findById(id)
        .select('-__v -createdAt')
        .exec()
        .then(doc => {
            const tier = {
                id: doc.id,
                tier: doc.tier,
                childrens: [
                    lis.children0,
                    lis.children1,
                    lis.children2,
                    lis.children3,
                    lis.children4,
                    lis.children5
                ],
                updateAt: doc.updateAt
            }
            res.status(200).json(tier);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
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
    unmarried.increment();
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


router.patch('/:tierId', (req, res, next) => {
    const tierId = req.params.tierId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propratyName] = ops.value;
    }
    Unmarried.updateOne({
            _id: tierId
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated with success.',
                url: 'http://' + req.headers.host + '/unmarried/' + tierId,
            });
        })
        .catch(err => {
            console.log(500).json({
                error: er
            })
        });
})


module.exports = router;