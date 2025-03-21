import React,  { useState, useEffect }  from 'react';
import axios from "axios";
import './dad-jokes.css'

export default function DadJokesPage() {

    const [joke, setJoke] = useState('');

    const getNextJoke = async () => {
        const res = await axios.get('https://icanhazdadjoke.com/',  { headers: { Accept: 'application/json' }});
        setJoke(res.data.joke);
    }

    useEffect(() => {
        //console.log("Dad Jokes page loaded");
        getNextJoke();
    }, []);

  return (
    <div className="dad-Joke-page">
      <h1>
        DadJokesPage
      </h1>
        <span className="joke">{joke}</span>
        <button onClick={ getNextJoke }>Get Next Joke</button>
    </div>
  );
}

