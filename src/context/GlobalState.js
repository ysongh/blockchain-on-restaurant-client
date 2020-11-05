import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
    ownerId: '',
    token: ''
}

export const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, inititalState);

    function saveToken(token, id){
        localStorage.setItem('jwtToken', token);

        const data = {token, id};

        dispatch({
            type: "SAVE_TOKEN",
            payload: data
        })
    }
    function logout(){
        localStorage.removeItem('jwtToken');
        dispatch({
            type: "LOGOUT"
        })
    }

    return (<GlobalContext.Provider value={{
        ownerId: state.ownerId,
        token: state.token,
        saveToken,
        logout
    }}>
        {children}
    </GlobalContext.Provider>);
}