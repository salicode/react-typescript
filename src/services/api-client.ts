import axios, {CanceledError} from 'axios';

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // headers: {
    //     'Content-type': 'application/json',
    // },
});

export{ CanceledError }
