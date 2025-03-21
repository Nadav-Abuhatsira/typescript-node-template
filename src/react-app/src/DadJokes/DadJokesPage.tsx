import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dad-jokes.css';

export default function DadJokesPage() {
  const [joke, setJoke] = useState('');
  const [storedJokes, setStoredJokes] = useState([]);

  const getNextJoke = async () => {
    const res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
    setJoke(res.data.joke);
  };

  const getStoredJokes = async () => {
    const res = await axios.get('http://localhost:5008/jokes-api/get-all');
    //console.log(res.data);
    setStoredJokes(res.data);
  };

  const storeJoke = async () => {
    const res = await axios.post('http://localhost:5008/jokes-api/add-joke', { joke });
    // @ts-ignore
    setStoredJokes([...storedJokes, res.data]);
  };

  useEffect(() => {
    getNextJoke();
    getStoredJokes();
  }, []);

  return (
    <div className="dad-Joke-page">
      <h1>DadJokesPage</h1>
      <span className="joke">{joke}</span>
      <button onClick={getNextJoke}>Get Next Joke from web</button>

      <button onClick={storeJoke}>Store Current Joke</button>

      <h3>Jokes I like</h3>
      {storedJokes.map((joke: any) => (
        <span>{joke.joke}</span>
      ))}

      <button onClick={getStoredJokes}>Refresh stored jokes</button>
    </div>
  );
}
