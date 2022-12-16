import { useQuery, gql } from "@apollo/client";
export const QUERY_ALL_REPOS = gql`
query GetRepos{
    Repos {
      name
      owner {
        login
        id
      }
      size
    }
  }
`;

export const QUERY_REPODETAILS = gql`
query RepoDetails($username1: String) {
    RepoDetails(name: $username1) {
      name
      owner {
        login
        id
      }
      size
      private
      NoOfFilesInRepo
      FileContent
    }
  }
`;