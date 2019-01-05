const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'ok'
    })
});

router.get('/:tier', (req, res, next) => {
    res.status(200).json({
        message: 'get all tax of this range'
    })
});


router.post('/', (req, res, next) => {
    const tier = {
        tierId: req.body.tierId,
        val0: req.body.val0,
        val1: req.body.val1,
        val2: req.body.val2,
        val3: req.body.val3,
        val4: req.body.val4,
        val5: req.body.val5
    }
    res.status(200).json({
        message: 'post new tier and taxs',
        tier: tier
    })
})


router.put('/:tier', (req, res, next) => {
    res.status(200).json({
        message: 'update tier'
    })
})


module.exports = router;