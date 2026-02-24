const express = require('express')
const { receiver } = require('./slack');

// receiver.app is a pre-initialized Express application
const app = receiver.app;

const togglRoutes = require("./routes/toggl.routes")

app.get('/', (req, res) => {
    res.send('AI Productivity Bot is running!')
})

// Apply json parsing ONLY to our custom routes so we don't break Bolt's built-in parsers
app.use("/toggl", express.json(), togglRoutes)

module.exports = app