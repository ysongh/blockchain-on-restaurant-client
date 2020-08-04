import React from 'react';

const Spinner = () => {
    return(
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-warning" style={{width: '7rem', height: '7rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;