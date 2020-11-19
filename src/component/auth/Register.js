import React, { useState, useContext }from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import axios from '../../axios';
import { GlobalContext } from '../../context/GlobalState';
import Alert from '../common/Alert';
import Background1 from '../../assets/background1.png';
import TextInput from '../common/TextInput';

const Register = () => {
    const history = useHistory();
    const { saveToken } = useContext(GlobalContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const registerOwner = async () => {
        try{
            const ownerData = {
                name,
                email,
                password
            }

            const { data } = await axios.post('/owner/register', ownerData);
            const decoded = jwt_decode(data.token);
            saveToken(data.token, decoded.id);

            axios.defaults.headers.common = {'Authorization' : data.token}
            history.push('/');
        } catch(err){
            setError("Invalid, try again");
            console.error(err);
        }
    }
    
    return(
        <div className="container">
            { error && <Alert msg={error} /> }
            <div className="row">
                <div className="col-12 col-md-5">
                    <img className="d-none d-md-block" src={Background1} alt="Restaurant" />
                </div>
                <div className="col-12 col-md-7">
                    <div className="container mt-5">
                        <h1 className="mb-4">Sign Up for Restaurant Owner</h1>
                        <TextInput
                            label="Your Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <TextInput
                            label="Email"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <TextInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <button className="btn btn-lg primary-color" onClick={() => registerOwner()}>Sign Up</button>

                        <p className="mt-3">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;