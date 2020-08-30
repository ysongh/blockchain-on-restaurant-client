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
        dispatch({
            type: "SAVE_TOKEN",
            payload: token
        })
    }

    return (<GlobalContext.Provider value={{
        owner: state.owner,
        token: state.token,
        saveToken
    }}>
        {children}
    </GlobalContext.Provider>);
}