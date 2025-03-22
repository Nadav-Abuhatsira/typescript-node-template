import React from 'react';
import './dad-jokes.css';
import '../style/button.css';
import '../style/text.css';
import { Joke } from './api/joke';
import { deleteJokeApi } from './api/jokes-api';
import { toast } from 'react-toastify';

export default function StoredJoke({ joke, onJokeRemoved }: { joke: Joke; onJokeRemoved: (joke: Joke) => void }) {
  const removeJoke = async () => {
    try {
      await deleteJokeApi(joke.id);
      onJokeRemoved(joke);
    } catch (error) {
      toast('Error removing joke. make sure the server is up');
    }
  };

  return (
    <div className="stored-Joke">
      <span className="ellipsis-text" title={joke.joke}>
        {joke.joke}
      </span>
      <button onClick={removeJoke} className="button-17 close-button" title="remove joke">
        x
      </button>
    </div>
  );
}
