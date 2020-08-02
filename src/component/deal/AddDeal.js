import React, { useState } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

import axios from '../../axios';
import TextInput from '../common/TextInput';

const AddDeal = () => {
    const history = useHistory();
    const { id } =  useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');

    const selectFile = e => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            setImageName(e.target.files[0].name);
        }
    }

    const onSubmit = async () => {
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', image);

            await axios.post(`/deal/${id}`, formData);

            history.push(`/restaurant/${id}`);

        } catch(err){
            console.error(err);
        }
    }

    return(
        <div className="container">
            <h1 className="mt-2">Add Deal</h1>

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

            <button className="btn btn-primary" onClick={onSubmit}>Create</button>
        </div>
    )
}

export default AddDeal;