const { App, ExpressReceiver } = require('@slack/bolt');
const { startTimer, getCurrentTimer, stopTimer } = require('./services/toggl.service');


const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET || '',
});


const slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN || '',
    appToken: process.env.SLACK_APP_TOKEN || '',
    receiver
});


slackApp.message(/start timer (.*)/i, async ({ message, say, context }) => {
    try {
        const description = context.matches[1];
        await startTimer(description);
        await say(`Started Toggl timer for: *${description}* ⏱️`);
    } catch (error) {
        await say(`Failed to start timer: ${error.message}`);
    }
});


slackApp.message(/current timer/i, async ({ message, say }) => {
    try {
        const current = await getCurrentTimer();
        if (current) {
            await say(`Currently working on: *${current.description}* ⏱️`);
        } else {
            await say("No Toggl timer is currently running.");
        }
    } catch (error) {
        await say(`Failed to get current timer: ${error.message}`);
    }
});


slackApp.message(/stop timer/i, async ({ message, say }) => {
    try {
        const current = await getCurrentTimer();
        if (!current) {
            await say("No Toggl timer is currently running to stop.");
            return;
        }
        await stopTimer(current.id, current.workspace_id);
        await say(`Stopped Toggl timer: *${current.description}* 🛑`);
    } catch (error) {
        await say(`Failed to stop timer: ${error.message}`);
    }
});

module.exports = { slackApp, receiver };
