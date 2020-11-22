import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import Moment from 'react-moment';

import { GlobalContext } from '../context/GlobalState';
import DefaultImage from '../assets/noimage.png';
import EditIcon from '../assets/edit-icon.svg';
import DeleteIcon from '../assets/delete-icon.svg';
import Modal from './common/Modal';

const Profile = () => {
    const { ownerId } = useContext(GlobalContext);

    const [data, setData] = useState({restaurants: []});
    const [go, setGo] = useState(true);

    useEffect(() => {
        async function getProfile() {
            try{
                const restaurantsData = await axios.get('/owner/profile/' + ownerId);
                
                for(let restaurant of restaurantsData.data.data.restaurants){
                    const deals = await getDeals(restaurant._id);
                    restaurant["deals"] = deals;
                }

                setData(restaurantsData.data.data);
            } catch(err){
                console.error(err);
            }
        }

        async function getDeals(restaurantId){
            const {data} = await axios.get('/deal/' + restaurantId);
            return data.data;
        }
        
        getProfile();
    }, []);

    const removeRestaurant = async restaurantId => {
        try{
            await axios.delete('/restaurant/' + restaurantId);
        } catch(err){
            console.error(err);
        }
    }

    const removeDeal = async (restaurantId, dealId) => {
        try{
            await axios.delete(`/deal/${restaurantId}/${dealId}`);

            setGo(!go);
        } catch(err){
            console.error(err);
        }
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-2">
                <h1>Welcome back, {data.name}</h1>
                <Link to="/addrestaurant" className="btn btn-info">
                    Add Restaurant
                </Link>
            </div>

            { data.restaurants.map(restaurant => {
                return(
                    <div className="row" key={restaurant._id}>
                        <div className="col-12 col-md-6 col-lg-4" >
                            <div className="card mb-3">
                                <Link to={`/restaurant/${restaurant._id}`}>
                                    <img className="card-img-height card-img-top" src={restaurant.image || DefaultImage} alt="Restaurant" />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">{restaurant.location}</p>
                                    <Link to={`/restaurant/${restaurant._id}`} className="btn primary-color">See Deals</Link>
                                    <Link to={`/restaurant/${restaurant._id}/adddeal`} className="btn primary-color">Add Deal</Link>
                                    <Link to={`/addrestaurant/${restaurant._id}`} className="btn btn-info action-icon mr-1">
                                        <img src={EditIcon} alt="Edit" />
                                    </Link>
                                    <img
                                        src={DeleteIcon}
                                        alt="Delete"
                                        className="btn btn-danger action-icon"
                                        data-toggle="modal"
                                        data-target="#modal" />
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Post On <Moment format="MM/DD/YYYY">{restaurant.date}</Moment>
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-8">
                            { restaurant.deals && restaurant.deals.map(deal => {
                                return(
                                    <div key={deal._id}>
                                        <h2>{deal.name}</h2>
                                        <p>{deal.price}</p>
                                        <p>{deal.description}</p>
                                        <Link to={`/restaurant/${restaurant._id}/adddeal/${deal._id}`} className="btn btn-info action-icon mr-1">
                                            <img src={EditIcon} alt="Edit" />
                                        </Link>
                                        <img src={DeleteIcon} alt="Delete" className="btn btn-danger action-icon" onClick={() => removeDeal(restaurant._id,deal._id)} />
                                    </div>
                                )
                            })}
                        </div>
                        <Modal onClick={() => removeRestaurant(restaurant._id)} />
                    </div>
                )
            })}
        </div>
    );
};

export default Profile;