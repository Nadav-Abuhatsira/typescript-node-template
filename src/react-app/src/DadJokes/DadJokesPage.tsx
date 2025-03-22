import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './dad-jokes.css';
import { getRandomJokeFromWeb, getStoredJokesApi, storeJokeApi } from './api/jokes-api';

export default function DadJokesPage() {
  const [joke, setJoke] = useState('');
  const [storedJokes, setStoredJokes] = useState([]);

  const getNextJoke = async () => {
    const joke = await getRandomJokeFromWeb();
    setJoke(joke);
  };

  const getStoredJokes = async () => {
    try {
      const jokes = await getStoredJokesApi();
      setStoredJokes(jokes);
    } catch (error) {
      toast('Error getting all jokes you liked. make sure the server is up');
    }
  };

  const storeJoke = async () => {
    try {
      const newJoke = await storeJokeApi(joke);
      // @ts-ignore
      setStoredJokes([...storedJokes, newJoke]);
    } catch (error) {
      toast('Error saving joke you liked. make sure the server is up');
    }
  };

  useEffect(() => {
    getNextJoke();
    getStoredJokes();
  }, []);

  return (
    <div className="dad-Joke-page">
      <ToastContainer />
      <h1>DadJokesPage</h1>
      <span className="joke">{joke}</span>
      <button onClick={getNextJoke}>Get Next Joke from web</button>
      <h3>Jokes I like</h3>
      {storedJokes.map((joke: any) => (
        <span>{joke.joke}</span>
      ))}
      <button onClick={storeJoke}>Save Current Joke</button>
      {/*<button onClick={getStoredJokes}>Refresh stored jokes</button>*/}
    </div>
  );
}
