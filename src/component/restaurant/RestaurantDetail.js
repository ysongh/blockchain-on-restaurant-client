import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link, useHistory } from 'react-router-dom';

import axios from '../../axios';
import Modal from '../common/Modal';
import DefaultImage from '../../assets/noimage.png';

const RestaurantDetail = () => {
    const { id } =  useParams();
    const history = useHistory();

    const [data, setData] = useState({deals: []});
    const [go] = useState(true);

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
        } catch(err){
            console.error(err);
        }
    }

    return(
        <div className="container">
            <h1 className="text-center">{data.name}</h1>
            <div className="row">
                <div className="col-12 col-md-6">
                    <img style={{height: '400px'}} src={data.image || DefaultImage} alt="Restaurant" />
                </div>
                <div className="col-12 col-md-6">
                    <p>{data.location}</p>
                    <p>{data.description}</p>
                    <Link to={`/restaurant/${id}/adddeal`} className="btn primary-color">Add Deal</Link>
                    <Link to={`/addrestaurant/${id}`} className="btn btn-info">Edit Restaurant</Link>
                    <button className="btn btn-danger" data-toggle="modal" data-target="#modal">Remove Restaurant</button>
                </div>
            </div>
            <hr />
            <div className="row">
                { data.deals.length ? (
                    data.deals.map(deal => {
                        return(
                            <div className="col-12 col-md-6 col-lg-4" key={deal._id}>
                                <div className="card mb-3">
                                    <img className="card-img-top" src={deal.image || DefaultImage} alt="Deal" />
                                    <div className="card-body">
                                        <h5 className="card-title">{deal.name}</h5>
                                        <p className="card-text">{deal.price}</p>
                                        <p className="card-text">{deal.description}</p>
                                        <Link to={`/restaurant/${id}/adddeal/${deal._id}`} className="btn btn-info">Edit Deal</Link>
                                        <button className="btn btn-danger" onClick={() => removeDeal(deal._id)}>Remove Deal</button>
                                        <p className="card-text"><small className="text-muted">{deal.date}</small></p>
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