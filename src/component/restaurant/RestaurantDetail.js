import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router";
import Moment from 'react-moment';

import axios from '../../axios';
import DefaultImage from '../../assets/noimage.png';
import Spinner from '../common/Spinner';
import { GlobalContext } from '../../context/GlobalState';

const RestaurantDetail = () => {
    const { id } =  useParams();
    const { account, contract } = useContext(GlobalContext);

    const [data, setData] = useState({deals: []});
    const [loading, setLoading] = useState(false);
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

    const buyFood = async price => {
        try{
            setLoading(true);
            const res = await contract.methods.supply().send({ from: account, value: window.web3.utils.toWei(price.toString(), 'Ether') });
            console.log(res);
            setLoading(false);
        }
        catch(err){
            console.error(err);
            setLoading(false);
        }
        
    }

    return(
        <div className="container">
            <div className="row mt-4">
                <div className="col-12 col-md-6">
                    <img style={{height: '400px'}} src={data.image || DefaultImage} alt="Restaurant" />
                </div>
                <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center">
                        <h1 className="mr-2">{data.name}</h1>
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
                </div>
            </div>
            <hr />
            {loading
                ? <Spinner />
                : <div className="row">
                    { data.deals.length ? (
                        data.deals.map(deal => {
                            return(
                                <div className="col-12 col-md-6 col-lg-4" key={deal._id}>
                                    <div className="card mb-3">
                                        <img className="card-img-top card-img-height" src={deal.image || DefaultImage} alt="Deal" />
                                        <span className="badge  badge-pill badge-info badge-price">ETH {deal.price}</span>
                                        <div className="card-body">
                                            <h5 className="card-title">{deal.name}</h5>
                                            <p className="card-text">{deal.description}</p>
                                            <p className="card-text">
                                                <small className="text-muted">
                                                    Post On <Moment format="MM/DD/YYYY">{deal.date}</Moment>
                                                </small>
                                            </p>
                                            <button
                                                className="btn secondary-color btn-lg"
                                                onClick={() => buyFood(deal.price)}
                                                disabled={!contract}>
                                                {contract ? "Buy" : "Collect to Wallet"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : <p className="mt-5 h4 text-danger">No Deals</p>}
                </div>
            }
        </div>
    );
};

export default RestaurantDetail;