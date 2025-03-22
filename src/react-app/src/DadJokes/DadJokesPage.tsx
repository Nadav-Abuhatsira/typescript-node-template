import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './dad-jokes.css';
import '../style/button.css';
import { getRandomJokeFromWeb, getStoredJokesApi, storeJokeApi } from './api/jokes-api';
import { Joke } from './api/joke';
import StoredJoke from './StoredJoke';

export default function DadJokesPage() {
  const [joke, setJoke] = useState('');
  const [storedJokes, setStoredJokes] = useState<Joke[]>([]);

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
      setStoredJokes([...storedJokes, newJoke]);
    } catch (error) {
      toast('Error saving joke you liked. make sure the server is up');
    }
  };

  const onJokeRemoved = (joke: Joke) => {
    setStoredJokes(storedJokes.filter((j: any) => j.id !== joke.id));
  };

  useEffect(() => {
    getNextJoke();
    getStoredJokes();
  }, []);

  return (
    <div className="dad-Joke-page">
      <ToastContainer />
      <h1>Dad Jokes</h1>
      <span className="joke">{joke}</span>
      <div className="buttons-panel">
        <button onClick={storeJoke} className="button-17">
          Save Current Joke
        </button>
        <button onClick={getNextJoke} className="button-17">
          Get Next Joke from web
        </button>
      </div>
      <h3>Jokes I like</h3>
      {storedJokes.map((joke: Joke) => (
        <StoredJoke joke={joke} onJokeRemoved={onJokeRemoved} key={joke.id} />
      ))}
    </div>
  );
}
