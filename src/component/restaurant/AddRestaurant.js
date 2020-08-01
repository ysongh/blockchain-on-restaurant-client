import React, { useState } from 'react';

import axios from '../../axios';

const AddRestaurant = () => {
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
            formData.append('image', image);

            await axios.post('/restaurant', formData);

            setImage('');
            setImageName('');

        } catch(err){
            console.error(err);
        }
    }

    return(
        <div className="container">
            <h1 className="mt-2">Blockchain on Restaurant</h1>

            <div className="form-group">
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

            <button className="btn btn-primary" onClick={onSubmit}>Create</button>
        </div>
    )
}

export default AddRestaurant;