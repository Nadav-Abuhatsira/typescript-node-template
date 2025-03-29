import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import './dad-jokes.css';
import '../style/button.css';
import { getStoredJokesApi, storeJokeApi } from './api/jokes-api';
import { Joke } from './api/joke';
import StoredJoke from './StoredJoke';
import { fetchWebJoke } from './actions/web-joke';
import { getWebJoke, loadingWebJoke } from './selectors/joke-selectors';

export default function WebJoke() {
  const dispatch = useDispatch();
  const joke = useSelector(getWebJoke);
  const loading = useSelector(loadingWebJoke);

  useEffect(() => {
    if (!joke && !loading) dispatch(fetchWebJoke() as any);
  }, []);

  if (loading) return <span className="joke">Loading...</span>;

  return <span className="joke">{joke}</span>;
}
