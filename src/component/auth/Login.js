import React, { useState, useContext }from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import axios from '../../axios';
import { GlobalContext } from '../../context/GlobalState';
import Alert from '../common/Alert';
import Background2 from '../../assets/background2.png';
import TextInput from '../common/TextInput';

const Login = () => {
    const history = useHistory();
    const { saveToken } = useContext(GlobalContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const loginOwner = async () => {
        try{
            const ownerData = {
                email,
                password
            }

            const { data } = await axios.put('/owner/login', ownerData);
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
                    <img className="d-none d-md-block" src={Background2} alt="Restaurant" />
                </div>
                <div className="col-12 col-md-7">
                    <div className="container mt-5">
                        <h1 className="mb-4">Welcome back Restaurant Owner</h1>
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
                        <button className="btn btn-lg primary-color" onClick={() => loginOwner()}>Login</button>
                        
                        <p className="mt-3">
                            Dont have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;