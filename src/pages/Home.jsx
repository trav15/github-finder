import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';

function Home() {
  return (
    <div>
        <h1 className="text-6xl pb-6">Welcome To The Github Finder</h1>
        <UserSearch />
        <UserResults />
    </div>
  )
}

export default Home