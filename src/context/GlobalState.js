import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { genKeyPairFromSeed, SkynetClient } from "skynet-js";

import { SEEDPHASE } from '../config';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey, publicKey } = genKeyPairFromSeed(SEEDPHASE);

const inititalState = {
    ownerId: '',
    token: '',
    account: '',
    privateKey: privateKey,
    publicKey: publicKey,
    clientSkyDB: client,
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
        privateKey: state.privateKey,
        publicKey: state.publicKey,
        clientSkyDB: state.clientSkyDB,
        saveToken,
        setAccount,
        setContract,
        logout
    }}>
        {children}
    </GlobalContext.Provider>);
}