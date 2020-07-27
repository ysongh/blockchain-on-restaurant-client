import React, { useState } from 'react';

const AddRestaurant = () => {
    const [image, setImage] = useState('');

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
                            name="image"/>
                        <label className="custom-file-label" htmlFor="inputGroupFile01">{image}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRestaurant;