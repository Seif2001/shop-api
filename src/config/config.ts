import dotenv from 'dotenv';

dotenv.config({ path: '../.env'});

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';

const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.9exnq7d.mongodb.net/?retryWrites=true&w=majority`;


const SERVER_PORT = process.env.SERVER_PORT || 3000;


export default {
  mongo:{
    url: MONGO_URL,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
  },
  
    server:{
        port: SERVER_PORT,
    }
};
