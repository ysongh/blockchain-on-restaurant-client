import React from 'react';

const TextInput = ({ label, type, placeholder, name, value, onChange }) => {
    return(
        <div className="form-group">
            <label className="font-weight-bold">{label || "Label"}</label>
            <input
                className="form-control"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange} />
        </div>
    );
};

export default TextInput;