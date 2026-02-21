const express = require('express')

const app = express()

const togglRoutes = require("./routes/toggl.routes")

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('heyyy')
})

app.use("/toggl", togglRoutes)


module.exports = app