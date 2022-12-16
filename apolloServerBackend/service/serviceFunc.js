const axios = require('axios');
async function getUserRepos() {
    try {
        const response = await axios.get("https://api.github.com/users/avinashparkale/repos", {
            OAUth: process.env.GITHUB_ACCESS_TOKEN
        });
        data = response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {getUserRepos};