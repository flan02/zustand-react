/* eslint-disable @typescript-eslint/no-unused-vars */

// TODO Github API with my data
//https://api.github.com/users/flan02
//https://api.github.com/users/flan02/repos

// TODO Zustand docs
// https://docs.pmnd.rs/zustand/getting-started/introduction

import Repo from './components/Repo'
import { useFetchRepos } from './hooks/useRepos'
import { useFavouriteReposStore, useFavouriteReposStorePersist } from './store/favouriteRepos'

function App() {
  const reposQuery = useFetchRepos()
  const reposStore = useFavouriteReposStorePersist()
  if (reposQuery.isLoading) return <div>Loading...</div>
  //console.log(reposQuery.data);
  //console.log(Object.keys(reposQuery.data));
  return (
    <div className='App'>
      <h1>Github data from API using Zustand & ReactQuery</h1>
      {
        reposQuery.data?.map((repo) => (
          <Repo key={repo.id} repo={repo} isFavourite={reposStore.id.includes(repo.id)} />

        ))
      }

    </div>
  )
}

export default App
