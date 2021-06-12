import cors from 'cors';
import express from 'express';
import searchRoutes from './routes/search.routes.js';

const server = express();

server.use(cors());
server.use(express.json());

server.use(searchRoutes);

server.get('/', (request, response) => response.json({ status: 'alive' }));

server.listen(4000);
