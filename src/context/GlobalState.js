import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
    ownerId: '',
    token: '',
    account: '',
    contract: null
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

    function setAccount(account){
        dispatch({
            type: "SET_ACCOUNT",
            payload: account
        })
    }

    function setContract(contract){
        dispatch({
            type: "SET_CONTRACT",
            payload: contract
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
        account: state.account,
        contract: state.contract,
        saveToken,
        setAccount,
        setContract,
        logout
    }}>
        {children}
    </GlobalContext.Provider>);
}