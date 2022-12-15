import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
let data;
let singleData

const typeDefs = `#graphql
  type Repo {
    name: String
    full_name : String
    size: String
  }
  type RepoDetail {
    name: String
    full_name : String
    size: Int
    private: Boolean
    NoOfFilesInRepo: Int
    fileContent: String
  }
  type Query {
    Repos: [Repo]
    RepoDetails(name: String):RepoDetail
  }
`;

const resolvers = {
    Query: {
        Repos: () => data,
        RepoDetails: async (_, args) => {
            singleData = ''
            let name = args.name;
            data.forEach(element => {
                if (element.name === name) {
                    singleData = element;
                }
            });
            if (singleData) {
                let url = `https://api.github.com/repos/avinashparkale/${name}/contents/`
                let repoFilesArr = await axios.get(url);
                singleData.NoOfFilesInRepo = repoFilesArr.data.length;
                let fileName = 'README.md';
                let contentUrl = `https://api.github.com/repos/avinashparkale/repoB/contents/New%20folder%20-%20Copy%20(2)/${fileName}?ref=master`
                let fileContent = await axios.get(contentUrl);
                console.log(fileContent.data.content)
                const buff = Buffer.from(fileContent.data.content, 'base64');
                const str = buff.toString('utf-8');
                console.log(str);
                singleData.FileContent = str;
                return singleData
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
getUserRepos().then(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`Server ready at: ${url}`);
});


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