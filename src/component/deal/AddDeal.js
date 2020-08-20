import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

import axios from '../../axios';
import TextInput from '../common/TextInput';
import Loading from '../common/Loading';

const AddDeal = () => {
    const history = useHistory();
    const { id, dealid } =  useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('Choose File');
    const [loading, setLoading] = useState(false);
    const [go] = useState(true);

    useEffect(() => {
        async function getDealInfo() {
            try{
                const { data } = await axios.get(`/deal/${id}/${dealid}`);

                setName(data.data.name || '');
                setPrice(data.data.price || '');
                setDescription(data.data.description || '');
            } catch(err){
                console.error(err);
            }
        }
        
        if(dealid) getDealInfo();

    }, [go, id]);

    const selectFile = e => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            setImageName(e.target.files[0].name);
        }
    }

    const onSubmit = async () => {
        try{
            setLoading(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', image);

            if(dealid){
                await axios.put(`/deal/${id}/${dealid}`, formData);
            } else{
                await axios.post(`/deal/${id}`, formData);
            }

            history.push(`/restaurant/${id}`);

        } catch(err){
            setLoading(false);
            console.error(err);
        }
    }

    return(
        <div className="container">
            <h1 className="mt-2">{dealid ? "Edit" : "Add"} Deal</h1>

            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <TextInput
                            label="Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <TextInput
                            label="Price"
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)} />
                        <TextInput
                            label="description"
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="text"><strong>Upload</strong></label>
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input 
                                    type="file"
                                    className="custom-file-input"
                                    name="image"
                                    onChange={selectFile}/>
                                <label className="custom-file-label" htmlFor="inputGroupFile01">{imageName}</label>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            {loading ? <Loading /> : <button className="btn btn-lg primary-color " onClick={onSubmit}>{id ? "Update" : "Create Deal"}</button> }
        </div>
    )
}

export default AddDeal;