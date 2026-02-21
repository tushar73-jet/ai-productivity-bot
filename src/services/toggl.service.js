const axios = require('axios')

const TOGGL_API = "https://api.track.toggl.com/api/v9/time_entries"

const startTimer = async (desc) => {
    try{
        const res = await axios.post(
            TOGGL_API,
            {
                description: desc,
                created_with: 'ai-productivity-bot',
                start: new Date().toISOString(),
                workspace_id: Number(process.env.TOGGL_WORKSPACE_ID)
            },
            {
                auth:{
                    username: process.env.TOGGL_API_TOKEN,
                    password: "api_token"
                }
            }
        )
        return res.data
    
    }catch(error){
        throw new Error(`Failed because: ${error.message}`)
    }
}

module.exports = {startTimer}