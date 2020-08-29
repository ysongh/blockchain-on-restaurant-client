import React, { useState }from 'react';
import { Link } from 'react-router-dom';

import axios from '../../axios';
import Background2 from '../../assets/background2.png';
import TextInput from '../common/TextInput';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginOwner = async () => {
        try{
            const ownerData = {
                email,
                password
            }

            const res = await axios.put('/owner/login', ownerData);
            console.log(res)
        } catch(err){
            console.error(err);
        }
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5">
                    <img src={Background2} alt="Restaurant" />
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