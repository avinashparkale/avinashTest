export function RepoDetailComp(props){
    console.log('inside repoDetails',props)
    return <div>
        <div>
              <div>Repo name: {props.repodata.name}</div>
              <div>Repo size: {props.repodata.size}</div>
              <div>Repo owner: {props.repodata.owner.login}</div>
              <div>Private\public repo: {props.repodata.private ? 'Private' : 'Public'}</div>
              <div>Number of files in the repo: {props.repodata.NoOfFilesInRepo}</div>
              <div>Active webhooks : {props.repodata.activeWebHooks}</div>
              <div>Content of file : {props.repodata.FileContent}</div>
            </div>
    </div>
}