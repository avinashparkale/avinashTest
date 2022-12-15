import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
let data;
const typeDefs = `#graphql
  type Repo {
    name: String
    full_name : String
    size: String
  }
  type RepoDetail {
    name: String
    full_name : String
    size: String
    private: Boolean
  }
  type Query {
    Repos: [Repo]
    RepoDetails:[RepoDetail]
  }
`;

const resolvers = {
    Query: {
        Repos:()=> data,
        RepoDetails:()=> data,
    },    
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});
getUserRepos().then(async ()=>{const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`Server ready at: ${url}`);});


async function getUserRepos() {
	try {
		const response = await axios.get("https://api.github.com/users/avinashparkale/repos",{
            OAUth : process.env.GITHUB_ACCESS_TOKEN
        });
        data = response.data;
        return data;
	}
	catch (error) {
		console.log(error);
	}
}