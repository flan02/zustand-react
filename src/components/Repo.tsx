/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from "../types"
import { useFavouriteReposStore, useFavouriteReposStorePersist } from "../store/favouriteRepos"


type Props = {
  repo: Repository
  isFavourite: boolean // if the repo is a favourite give back true if not false
}

/*
* Common way to loop through the data and display it
const Repo = (props: Props) => {
  return (
    <div key={props.repo.id}>
      <h2>{props.repo.name}</h2>
      <p>{props.repo.description}</p>
    </div>
  )
}
*/

// TODO Use object destructuring to simplify the Repo component
const Repo = ({ repo, isFavourite }: Props) => {
  const reposStore = useFavouriteReposStorePersist() // We use the store whenever we need because it's a global state
  const toggleFavourite = () => {
    if (isFavourite) {
      reposStore.removeFavourite(repo.id)
      return
    }
    reposStore.addFavourite(repo.id)
  }

  return (
    <div key={repo.id}>
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <button onClick={toggleFavourite}>
        {
          isFavourite ? 'dislike' : 'like'
        }
      </button>
    </div>
  )
}

export default Repo