import React, { useState }from 'react';

import axios from '../../axios';
import Background1 from '../../assets/background1.png';
import TextInput from '../common/TextInput';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerOwner = async () => {
        try{
            const ownerData = {
                name,
                email,
                password
            }

            const res = await axios.post('/owner/register', ownerData);
            console.log(res)
        } catch(err){
            console.error(err);
        }
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5">
                    <img src={Background1} alt="Restaurant" />
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;