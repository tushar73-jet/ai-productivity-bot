require('dotenv').config()

const { app, slackApp } = require('./app')

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`)
})

    // Start Slack Bolt App
    ; (async () => {
        try {
            await slackApp.start();
            console.log('⚡️ Slack Bolt app is running in Socket Mode!');
        } catch (error) {
            console.error('Failed to start Slack Bolt app:', error.message);
        }
    })();