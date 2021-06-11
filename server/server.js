import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.routes.js';

dotenv.config();

const apiKey = process.env.API_KEY;

const searchAddress = `https://www.googleapis.com/books/v1/volumes?key=${apiKey}&q=`;

const server = express();

server.use(cors());
server.use(express.json());

server.use(searchRoutes);

server.get('/', (request, response) => response.json({ status: 'alive' }));

server.listen(4000, () => console.log('Server has been started!'));
