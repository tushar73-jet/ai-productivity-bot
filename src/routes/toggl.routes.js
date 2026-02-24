const express = require('express')
const router = express.Router()

const { startTimer, getCurrentTimer, stopTimer } = require("../services/toggl.service")

router.post('/start', async (req, res) => {
    try {
        const { description } = req.body
        const result = await startTimer(description)
        res.status(200).json({
            message: 'Timer started',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.get('/current', async (req, res) => {
    try {
        const result = await getCurrentTimer()
        res.status(200).json({
            message: 'Current timer fetched',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.post('/stop', async (req, res) => {
    try {
        const current = await getCurrentTimer();
        if (!current) {
            return res.status(404).json({ message: 'No timer is currently running' });
        }

        const result = await stopTimer(current.id, current.workspace_id)
        res.status(200).json({
            message: 'Timer stopped',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router
