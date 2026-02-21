const express = require('express')
const router = express.Router()

const {startTimer} = require("../services/toggl.service")


router.post('/start', async(req,res)=>{
    try{
        const {description} = req.body
        const result = await startTimer(description)

        res.status(200).json({
            message:'Timer started',
            data: result
        })
    } catch(error){
        res.status(500).json({
            error:error.message
        })
    }
})
module.exports = router
