import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getStoredJokesApi, storeJokeApi } from './api/jokes-api';
import { Joke } from './api/joke';
import StoredJoke from './StoredJoke';
import { getWebJoke } from './selectors/joke-selectors';

export default function StoredJokesList() {
  const joke = useSelector(getWebJoke);

  const [storedJokes, setStoredJokes] = useState<Joke[]>([]);

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
      const newJoke = await storeJokeApi(joke as string);
      setStoredJokes([...storedJokes, newJoke]);
    } catch (error) {
      toast('Error saving joke you liked. make sure the server is up');
    }
  };

  const onJokeRemoved = (joke: Joke) => {
    setStoredJokes(storedJokes.filter((j: any) => j.id !== joke.id));
  };

  useEffect(() => {
    getStoredJokes();
  }, []);

  return (
    <div>
      <h3>Jokes I like</h3>
      <div className="buttons-panel">
        <button onClick={storeJoke} className="button-17">
          Save Current Joke
        </button>
      </div>
      <div className="stored-jokes">
        {storedJokes.map((joke: Joke) => (
          <StoredJoke joke={joke} onJokeRemoved={onJokeRemoved} key={joke.id} />
        ))}
      </div>
    </div>
  );
}
