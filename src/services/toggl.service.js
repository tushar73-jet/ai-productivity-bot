const axios = require('axios')

const getAuth = () => ({
    username: process.env.TOGGL_API_TOKEN,
    password: "api_token"
});

const startTimer = async (desc) => {
    try{
        const workspaceId = Number(process.env.TOGGL_WORKSPACE_ID);
        const url = `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries`;
        
        const startTimestamp = Math.floor(Date.now() / 1000);
        
        const res = await axios.post(
            url,
            {
                description: desc,
                created_with: 'ai-productivity-bot',
                start: new Date().toISOString(),
                workspace_id: workspaceId,
                duration: -1 * startTimestamp
            },
            { auth: getAuth() }
        );
        return res.data;
    }catch(error){
        throw new Error(`Failed because: ${error.message}`);
    }
}

const getCurrentTimer = async () => {
    try {
        const url = "https://api.track.toggl.com/api/v9/me/time_entries/current";
        const res = await axios.get(url, { auth: getAuth() });
        return res.data; // returns null if no timer is running
    } catch(error) {
        throw new Error(`Failed to get current timer: ${error.message}`);
    }
}

const stopTimer = async (timeEntryId, workspaceId) => {
    try {
        const url = `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries/${timeEntryId}/stop`;
        const res = await axios.patch(url, {}, { auth: getAuth() });
        return res.data;
    } catch(error) {
        throw new Error(`Failed to stop timer: ${error.message}`);
    }
}

module.exports = { startTimer, getCurrentTimer, stopTimer }