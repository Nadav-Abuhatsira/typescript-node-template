import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dad-jokes.css';

export default function DadJokesPage() {
  const [joke, setJoke] = useState('');

  const getNextJoke = async () => {
    const res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
    setJoke(res.data.joke);
  };

  const storeJoke = async () => {
    const res = await axios.post('http://localhost:5008/jokes-api/add-joke', { joke });
    console.log(res.data);
  };

  const getStoredJokes = async () => {
    const res = await axios.get('http://localhost:5008/jokes-api/get-all');
    console.log(res.data);
  };

  useEffect(() => {
    //console.log("Dad Jokes page loaded");
    getNextJoke();
  }, []);

  return (
    <div className="dad-Joke-page">
      <h1>DadJokesPage</h1>
      <span className="joke">{joke}</span>
      <button onClick={getNextJoke}>Get Next Joke from web</button>

      <button onClick={storeJoke}>Store Current Joke</button>
      <button onClick={getStoredJokes}>Get stored jokes</button>
    </div>
  );
}
