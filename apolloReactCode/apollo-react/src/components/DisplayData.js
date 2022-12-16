import React, { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import {QUERY_ALL_REPOS, QUERY_REPODETAILS} from '../models.js/gql'
import {RepoDetailComp} from './RepoDetailComp';

function DisplayData(){
    const [repo, setRepo] = useState("");

    const [
        fetchRepo,
        { data: repoData, error: repoError },
      ] = useLazyQuery(QUERY_REPODETAILS);

    const {data} = useQuery(QUERY_ALL_REPOS);

    function ButtonClicked(repoName){
        console.log('clickeddddd',repoName)
        setRepo(repoName);
        fetchRepo({
            variables: {
              username1: repo,
            }})
        console.log(repoData)    
    }

    if(data){
        console.log(data);
        let tags = data.Repos.map((repo)=>{
            console.log(repo.name)
            return <tr>
                <td>{repo.name}</td>
                <td>{repo.owner.login}</td>
                <td>{repo.owner.id}</td>
                <td><button onClick={()=>{ButtonClicked(repo.name)}}>{repo.size}</button></td>
            </tr>
        })
        return<div>
            <table>
            <tr>
                <th>
                Repo Name
                </th>
                <th>
                owner Name
                </th>
                <th>
                Owner Id
                </th>
                <th>
                Repo Size(KB)
                </th>
            </tr>
            {tags}
        </table>
        <h1>Repo Details</h1>
        <div>
        {repoData && repoData.RepoDetails && (<div>
            <RepoDetailComp repodata={repoData.RepoDetails} />
        </div>
            
          )}
        </div>
        </div>

    }else{
        return <div>no data found</div>
    }
    
}
export default DisplayData;