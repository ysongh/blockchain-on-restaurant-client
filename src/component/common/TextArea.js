import React from 'react';

const TextArea = ({ label, name, value, onChange }) => {
    return(
        <div className="form-group">
            <label className="font-weight-bold">{label || "Label"}</label>
            <textarea
                className="form-control"
                type="text"
                name={name}
                rows="7"
                value={value}
                onChange={onChange} />
        </div>
    );
};

export default TextArea;