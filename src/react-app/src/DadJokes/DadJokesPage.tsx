import React from 'react';
import { ToastContainer } from 'react-toastify';
import './dad-jokes.css';
import '../style/button.css';
import WebJoke from './WebJoke';
import StoredJokesList from './StoredJokesList';

export default function DadJokesPage() {
  return (
    <div className="dad-Joke-page">
      <ToastContainer />
      <h1>Dad Jokes</h1>
      <WebJoke />
      <StoredJokesList />
    </div>
  );
}
