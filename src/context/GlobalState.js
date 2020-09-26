import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
    owner: {},
    token: ''
}

export const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, inititalState);

    function saveToken(token){
        localStorage.setItem('jwtToken', token);
        dispatch({
            type: "SAVE_TOKEN",
            payload: token
        })
    }
    function logout(){
        localStorage.removeItem('jwtToken');
        dispatch({
            type: "LOGOUT"
        })
    }

    return (<GlobalContext.Provider value={{
        owner: state.owner,
        token: state.token,
        saveToken,
        logout
    }}>
        {children}
    </GlobalContext.Provider>);
}