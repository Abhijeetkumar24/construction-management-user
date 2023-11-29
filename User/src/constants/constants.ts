// import dotenv from 'dotenv'
// dotenv.config();

require('dotenv').config();

export const portNumber = process.env.PORT;
export const authContext = '/user/auth';
export const userContext = '/user';
export const GRPC_HOST = '0.0.0.0'; 
export const GRPC_PORT = 6000;