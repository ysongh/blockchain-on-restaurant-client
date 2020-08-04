import axios from 'axios';

let serverURL = 'http://localhost:1000/api/';

if(process.env.NODE_ENV === 'production'){
    serverURL = 'https://eatoutcoinserver.herokuapp.com/api/';
}

const instance = axios.create({
   baseURL: serverURL
});

export default instance;