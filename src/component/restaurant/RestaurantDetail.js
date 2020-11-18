import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router";
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';

import axios from '../../axios';
import Modal from '../common/Modal';
import DefaultImage from '../../assets/noimage.png';
import EditIcon from '../../assets/edit-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';
import { GlobalContext } from '../../context/GlobalState';

const RestaurantDetail = () => {
    const { token } = useContext(GlobalContext);
    const { id } =  useParams();
    const history = useHistory();

    const [data, setData] = useState({deals: []});
    const [go, setGo] = useState(true);

    useEffect(() => {
        async function getRestaurants() {
            try{
                const { data } = await axios.get('/restaurant/' + id);
                
                setData(data.data);
            } catch(err){
                console.error(err);
            }
        }
        
        getRestaurants();
    }, [go, id]);

    const removeRestaurant = async () => {
        try{
            await axios.delete('/restaurant/' + id);
            history.push('/restaurant');
        } catch(err){
            console.error(err);
        }
    }

    const removeDeal = async (dealId) => {
        try{
            await axios.delete(`/deal/${id}/${dealId}`);

            setGo(!go);
        } catch(err){
            console.error(err);
        }
    }

    const restaurantActionButtons = (
        <>
            
            <Link to={`/addrestaurant/${id}`} className="btn btn-info action-icon mr-1">
                <img src={EditIcon} alt="Edit" />
            </Link>
            <img
                src={DeleteIcon}
                alt="Delete"
                className="btn btn-danger action-icon"
                data-toggle="modal"
                data-target="#modal" />
        </>
    )

    return(
        <div className="container">
            <div className="row mt-4">
                <div className="col-12 col-md-6">
                    <img style={{height: '400px'}} src={data.image || DefaultImage} alt="Restaurant" />
                </div>
                <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center">
                        <h1 className="mr-2">{data.name}</h1>
                        { token && restaurantActionButtons }
                    </div>
                    <p>{data.location}</p>
                    <p>{data.phoneNumber}</p>
                    <p>{data.email}</p>
                    <p>{data.description}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            Post On <Moment format="MM/DD/YYYY">{data.date}</Moment>
                        </small>
                    </p>
                    <Link to={`/restaurant/${id}/adddeal`} className="btn primary-color">Add Deal</Link>
                </div>
            </div>
            <hr />
            <div className="row">
                { data.deals.length ? (
                    data.deals.map(deal => {
                        return(
                            <div className="col-12 col-md-6 col-lg-4" key={deal._id}>
                                <div className="card mb-3">
                                    <img className="card-img-top card-img-height" src={deal.image || DefaultImage} alt="Deal" />
                                    <div className="card-body">
                                        <h5 className="card-title">{deal.name}</h5>
                                        <p className="card-text">{deal.price}</p>
                                        <p className="card-text">{deal.description}</p>
                                        { token && (
                                            <>
                                                <Link to={`/restaurant/${id}/adddeal/${deal._id}`} className="btn btn-info action-icon mr-1">
                                                    <img src={EditIcon} alt="Edit" />
                                                </Link>
                                                <img src={DeleteIcon} alt="Delete" className="btn btn-danger action-icon" onClick={() => removeDeal(deal._id)} />
                                            </>
                                        )}
                                        
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Post On <Moment format="MM/DD/YYYY">{deal.date}</Moment>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : <p className="mt-5 h4 text-danger">No Deals</p>}
            </div>
            <Modal onClick={() => removeRestaurant()} />
        </div>
    );
};

export default RestaurantDetail;