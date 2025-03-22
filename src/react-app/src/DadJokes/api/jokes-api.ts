import axios from 'axios';


//toDo define joke type

export async function getRandomJokeFromWeb ():Promise<string> {
  const res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
  return res.data.joke;
}

export async function getStoredJokesApi () {
    const res = await axios.get('http://localhost:5008/jokes-api/get-all');
    return res.data;
}

export async function storeJokeApi (joke: string) {
  const res = await axios.post('http://localhost:5008/jokes-api/add-joke', { joke });
  return res.data;
}