import { createStore, applyMiddleware } from 'redux';
import {thunk, ThunkMiddleware } from 'redux-thunk';
import jokeReducer from '../reducer/jokeReducer';
import { JokeActionTypes } from '../actions/action-types';

const store = createStore(jokeReducer, applyMiddleware(thunk as any as ThunkMiddleware<{}, JokeActionTypes>));

export default store;