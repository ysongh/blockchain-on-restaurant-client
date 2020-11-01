import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

import axios from '../../axios';
import Alert from '../common/Alert';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Loading from '../common/Loading';
import DefaultImage from '../../assets/noimage.png';

const AddRestaurant = () => {
    const { id } =  useParams();
    const history = useHistory();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [imageName, setImageName] = useState('Choose File');
    const [loading, setLoading] = useState(false);
    const [go] = useState(true);
    const [preview, setPreview] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        async function getRestaurantInfo() {
            try{
                const { data } = await axios.get('/restaurant/' + id);

                setName(data.data.name || '');
                setLocation(data.data.location || '');
                setDescription(data.data.description || '');
            } catch(err){
                console.error(err);
            }
        }
        
        if(id) getRestaurantInfo();

    }, [go, id]);

    useEffect(() => {
        if(!imageFile){
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const selectFile = e => {
        if(!e.target.files || e.target.files.length === 0){
            setImageFile(undefined);
            return;
        }
        setImageFile(e.target.files[0]);
        setImageName(e.target.files[0].name);
    }

    const onSubmit = async () => {
        try{
            setLoading(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('location', location);
            formData.append('phoneNumber', phoneNumber);
            formData.append('email', email);
            formData.append('description', description);
            formData.append('image', imageFile);

            if(id){
                await axios.put('/restaurant/' + id, formData);
                history.push('/restaurant');
            } else{
                await axios.post('/restaurant', formData);
                history.push('/restaurant');
            }

        } catch(err){
            setError("Invalid, try again");
            setLoading(false);
            console.error(err);
        }
    }

    return(
        <div className="container">
            { error && <Alert msg={error} /> }
            <h1 className="mt-2">{id ? "Edit" : "Add"} Restaurant</h1>

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
                            label="Phone Number"
                            type="text"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)} />
                        <TextInput
                            label="Email"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <TextArea
                            label="Description"
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
                        <img src={imageFile ? preview : DefaultImage} alt="Preview" />
                    </div>
                </div>
                
            </div>

            {loading ? <Loading /> : <button className="btn btn-lg primary-color " onClick={onSubmit}>{id ? "Update" : "Create Restaurant"}</button> }
        </div>
    )
}

export default AddRestaurant;