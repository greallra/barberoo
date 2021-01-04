import axios from 'axios';
//REACT_APP_API_URL_HEROKU
//REACT_APP_API_URL_LOCAL

//any request with axios will use this url
// let baseURL;
// if(window.location.href.includes('localhost')) {
//     baseURL = 'http://localhost:4000'
// } else {
//     baseURL = ''
// }

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


export default instance;