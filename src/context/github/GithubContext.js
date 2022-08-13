import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com"

export const GithubProvider = ({children}) => {
    // setLoading();

    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //Get search results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text,
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`)
        
        const { items }= await response.json();
        
    dispatch({
        type: 'GET_USERS',
        payload: items,
    })
    }

    //Clear users array
    const clearUsers = () => { 
        dispatch({
            type: 'CLEAR_USERS',
        })
     }

    //Set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        users: state.users, 
        loading: state.loading,
        searchUsers,
        clearUsers,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext