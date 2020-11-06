import React, { useState, useEffect, useContext } from 'react';
import axios from '../axios';

import { GlobalContext } from '../context/GlobalState';

const Profile = () => {
    const { ownerId } = useContext(GlobalContext);

    const [data, setData] = useState({restaurants: []});

    useEffect(() => {
        async function getProfile() {
            try{
                const { data } = await axios.get('/owner/profile/' + ownerId);
                
                setData(data.data);
            } catch(err){
                console.error(err);
            }
        }
        
        getProfile();
    }, []);

    return(
        <div className="container">
            <h1>{data.name}</h1>
        </div>
    );
};

export default Profile;