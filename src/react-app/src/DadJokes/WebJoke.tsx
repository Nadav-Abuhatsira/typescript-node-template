import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWebJoke } from './actions/web-joke';
import { getWebJoke, loadingWebJoke } from './selectors/joke-selectors';

export default function WebJoke() {
  const dispatch = useDispatch();
  const joke = useSelector(getWebJoke);
  const loading = useSelector(loadingWebJoke);

  const getNextJoke = async () => {
    dispatch(fetchWebJoke() as any);
  };

  useEffect(() => {
    if (!joke && !loading) getNextJoke();
  }, []);

  const display = loading ? 'Loading...' : joke;

  return (
    <div className="web-joke">
      <span className="joke">{display}</span>
      <div className="buttons-panel">
        <button onClick={getNextJoke} className="button-17">
          Get Next Joke from web
        </button>
      </div>
    </div>
  );
}
