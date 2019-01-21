
const mongoose = require('mongoose');
const Unmarried = require('../models/unmarried');
const checkAuth = require('../middleware/checkAuth');

const Util = require('../models/fc-util');

exports.getAll = async (req, res, next) => {
    Unmarried.find()
        .select('-__v -createdAt')
        .exec()
        .then(list => {

        console.log(req);
            const response = Util.formatOutput(list, req);
            res.status(200).json(response);
        
        })
        .catch(err => {
        
            res.status(500).json({
                error: err
            })
        
        });
}


exports.getById = (req, res, next) => {

    const id = req.params.id;

    Unmarried.findById(id)
        .select('-__v -createdAt')
        .exec()
        .then(doc => {

            const tier = Util.formatOneOutput(doc, req);
            res.status(200).json(tier);
        
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}


exports.addNew = checkAuth, (req, res, next) => {
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

            res.status(200).json({
                message: 'Post done.',
                insert: unmarried
            })
        
        })
        .catch(err => {
        
            res.status(500).json({
                error: err
            })
        
        });
}


exports.editById = checkAuth, (req, res, next) => {
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
}