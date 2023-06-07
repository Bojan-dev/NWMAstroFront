import axios from 'axios';

const instance = axios.create({
  baseURL:
    'http://www.nwmbackend-env.eba-jkm6sgnh.us-east-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
