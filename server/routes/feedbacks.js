const express = require('express');
const router = express.Router();
const { Feedback } = require("../models/Feedback");

const { auth } = require("../middleware/auth");

router.post('/create', auth, (req, res) => {
    const feedback = new Feedback(req.body)
    feedback.save((err, doc) => {
        if (err) return res.status(500).end()
        return res.status(200).json({
            success: true
        });
    });
})

router.post('/list', auth, async (req, res) => {
    let feedbacks = await Feedback.find().catch(err => { console.log('feedback error', err.message) })

    if (!feedbacks) {
        return res.status(500).end()
    }

    res.json({ list: feedbacks })
})

router.post('/delete', auth, async (req, res) => {
    let result = await Feedback.deleteOne({_id: req.body.feedback_id}).catch(err => { console.log('feedback error', err.message) })

    if (!result) {
        return res.status(500).end()
    }

    res.json({ success: true })
})

module.exports = router;
