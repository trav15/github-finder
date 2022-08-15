import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com"

export const GithubProvider = ({children}) => {
    // setLoading();

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)



    //Get single user
    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`)
        
        if(response.state === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json();
        
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

    //Get user repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)
        
        const data = await response.json();
        
        dispatch({
            type: 'GET_REPOS',
            payload: data,
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

    return <GithubContext.Provider 
        value={{
            ...state,
            dispatch,
            clearUsers,
            getUser,
            getUserRepos,
        }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext