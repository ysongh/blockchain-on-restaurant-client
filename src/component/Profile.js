import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import Moment from 'react-moment';

import { GlobalContext } from '../context/GlobalState';
import DefaultImage from '../assets/noimage.png';

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
            <div className="row">
                {
                    data.restaurants.map(restaurant => {
                        return(
                            <div className="col-12 col-md-6 col-lg-4" key={restaurant._id}>
                                <div className="card mb-3">
                                    <Link to={`/restaurant/${restaurant._id}`}>
                                        <img className="card-img-height card-img-top" src={restaurant.image || DefaultImage} alt="Restaurant" />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{restaurant.name}</h5>
                                        <p className="card-text">{restaurant.location}</p>
                                        <Link to={`/restaurant/${restaurant._id}`} className="btn primary-color">See Deals</Link>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Post On <Moment format="MM/DD/YYYY">{restaurant.date}</Moment>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Profile;