import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
    owner: {}
}

export const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, inititalState);

    return (<GlobalContext.Provider value={{
        owner: state.owner
    }}>
        {children}
    </GlobalContext.Provider>);
}