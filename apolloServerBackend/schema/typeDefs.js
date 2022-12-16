const { gql } = require("apollo-server");

const typeDefs = gql`
  type Repo {
    name: String
    owner : owner
    size: String
  }
  type owner{
    login: String
    id: String
  }
  type RepoDetail {
    name: String
    owner : owner
    size: Int
    private: Boolean
    NoOfFilesInRepo: Int
    FileContent: String
    activeWebHooks: String
  }
  type Query {
    Repos: [Repo]
    RepoDetails(name: String):RepoDetail
  }
`;

module.exports = { typeDefs };