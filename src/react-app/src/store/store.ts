import { createStore, applyMiddleware } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import { JokeActionTypes } from '../DadJokes/actions/action-types';
import rootReducer, { RootState } from './rootReducer';

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, JokeActionTypes>));

export default store;
