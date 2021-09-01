import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import axios from '../../axios';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';
import DefaultImage from '../../assets/noimage.png';

const Deals = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [go] = useState(true);

    useEffect(() => {
        async function getRestaurants() {
            try{
                const { data } = await axios.get('/deal');
    
                setData(data.data);
            } catch(err){
                setError("Something went wrong with server. Try again later.");
                console.error(err);
            }
        }
        
        getRestaurants();
    }, [go]);

    return(
        <div className="container">
            { error && <Alert msg={error} /> }
            <h1 className="text-center">Deals</h1>
            <div className="row">
                { data.length ? (
                    data.map(restaurant => {
                        return(
                            <div className="col-12 col-md-6 col-lg-4" key={restaurant._id}>
                                <div className="card mb-3">
                                    <Link to={`/restaurant/${restaurant.restaurant}`}>
                                        <img className="card-img-height card-img-top" src={restaurant.image || DefaultImage} alt="Restaurant" />
                                        <span className="badge  badge-pill badge-info badge-price">ETH {restaurant.price}</span>
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{restaurant.name}</h5>
                                        <p className="card-text">{restaurant.location}</p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/restaurant/${restaurant.restaurant}`} className="btn primary-color">See Restaurant</Link>
                                            
                                        </div>
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
                ) : null}
            </div>
            {!data.length && <Spinner />}
        </div>
    );
};

export default Deals;