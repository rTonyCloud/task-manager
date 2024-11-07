import dotenv from 'dotenv';

dotenv.config();

const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    environment: process.env.REACT_APP_ENV || 'development',
    appName: process.env.REACT_APP_NAME || 'Task Manager',
};

export default config;
