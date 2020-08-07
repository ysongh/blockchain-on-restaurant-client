import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '../../axios';
import TextInput from '../common/TextInput';
import Loading from '../common/Loading';

const AddRestaurant = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('Choose File');
    const [loading, setLoading] = useState(false);

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
            formData.append('location', location);
            formData.append('description', description);
            formData.append('image', image);

            await axios.post('/restaurant', formData);

            history.push('/restaurant');

        } catch(err){
            setLoading(false);
            console.error(err);
        }
    }

    return(
        <div className="container">
            <h1 className="mt-2">Add Restaurant</h1>

            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <TextInput
                            label="Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <TextInput
                            label="Location"
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)} />
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

            {loading ? <Loading /> : <button className="btn btn-lg primary-color " onClick={onSubmit}>Create Restaurant</button> }
        </div>
    )
}

export default AddRestaurant;