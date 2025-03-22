import axios from 'axios';
import { Joke } from './joke';

export async function getRandomJokeFromWeb(): Promise<string> {
  const res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
  return res.data.joke;
}

export async function getStoredJokesApi(): Promise<Joke[]> {
  const res = await axios.get('http://localhost:5008/jokes-api/get-all');
  return res.data;
}

export async function storeJokeApi(joke: string): Promise<Joke> {
  const res = await axios.post('http://localhost:5008/jokes-api/add-joke', { joke });
  return res.data;
}

export async function deleteJokeApi(jokeId: string): Promise<Joke> {
  const res = await axios.delete(`http://localhost:5008/jokes-api/delete-joke/${jokeId}`);
  return res.data;
}