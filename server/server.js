import cors from 'cors';
import express from 'express';
import searchRoutes from './routes/search.routes.js';
import dirname from './lib/pathHelpers.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(import.meta.url);

const server = express();

server.use(cors());
server.use(express.json());
server.use(searchRoutes);

server.use(express.static(path.join(__dirname, '../client/build')));
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

server.get('/health', (request, response) =>
  response.json({ status: 'alive' })
);

const port = process.env.PORT || 4000;
server.listen(port);
