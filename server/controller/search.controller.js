import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;

const searchAddress = `https://www.googleapis.com/books/v1/volumes?key=${apiKey}&maxResults=25&q=`;

async function googleSearch(req, res) {
  const searchQuery = req.body;
  try {
    const response = await fetch(searchAddress + searchQuery.searchQuery);
    const body = await response.json();
    res.json(body);
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: 'search failed. please try again' });
  }
}

export { googleSearch };
