import cors from 'cors';
import dirname from './lib/pathHelpers.js';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import searchRoutes from './routes/search.routes.js';
import usersRoutes from './routes/users.routes.js';

dotenv.config();

const __dirname = dirname(import.meta.url);

const server = express();

const DB_NAME = process.env.DB_NAME || 'Bookshelves';

const connectionString = 'mongodb://localhost:27017/' + DB_NAME;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set('returnOriginal', false);

server.use(cors());
server.use(express.json());
server.get('/health', (request, response) =>
  response.json({ status: 'alive' })
);

server.use(searchRoutes);

server.use(usersRoutes);

server.use(express.static(path.join(__dirname, '../client/build')));
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 4000;

server.listen(port, () =>
  console.log(`server is up and running on port ${port}`)
);
