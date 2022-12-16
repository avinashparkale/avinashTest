const axios = require('axios');
const {getUserRepos} = require("../service/serviceFunc");
let data;
let singleData
const resolvers = {
    Query: {
        Repos: async () => {
            data = await getUserRepos();
            return data;
        },
        RepoDetails: async (_, args) => {
            singleData = ''
            let name = args.name;
            data = await getUserRepos();
            data.forEach(element => {
                if (element.name === name) {
                    singleData = element;
                }
            });
            if (singleData) {
                let url = `https://api.github.com/repos/avinashparkale/${name}/contents/`
                let repoFilesArr = await axios.get(url);
                singleData.NoOfFilesInRepo = repoFilesArr.data.length;
                // reading .md file instead of yml file because didn't found any in that repo
                let fileName = 'README.md';
                let contentUrl = `https://api.github.com/repos/avinashparkale/repoB/contents/New%20folder%20-%20Copy%20(2)/${fileName}?ref=master`
                let fileContent = await axios.get(contentUrl);
                const buff = Buffer.from(fileContent.data.content, 'base64');
                const str = buff.toString('utf-8');
                singleData.FileContent = str;
                try {
                    let webHookApiUrl= `https://api.github.com/repos/avinashparkale/${name}/hooks`;
                    let webHookRes = await axios.get(webHookApiUrl);
                    console.log("webHook",webHookRes);
                } catch (error) {
                    if(error.response.status == 404){
                        singleData.activeWebHooks = 1;
                    }
                }
                return singleData
            }
        },
    },
};

module.exports = { resolvers };