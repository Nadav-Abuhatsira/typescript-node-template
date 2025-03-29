// reducers/jokeReducer.ts

import {
  WEB_JOKE_LOADING,
  WEB_JOKE_LOADED,
  WEB_JOKE_ERROR,
  JokeActionTypes,
  WebJokeLoadedAction,
  WebJokeErrorAction,
} from '../actions/action-types';

export interface WebJokeState {
  joke: string | null;
  loading: boolean;
  error: string | null;
}

export interface JokeState {
  webJoke: WebJokeState;
}

const initialState: JokeState = {
  webJoke: {
    joke: null,
    loading: false,
    error: null,
  },
};

const onWebJokeLoading = (state: JokeState) => {
  return {
    ...state,
    webJoke: { ...state.webJoke, loading: true, error: null },
  };
};

const onWebJokeLoaded = (state: JokeState, action: WebJokeLoadedAction) => {
  return {
    ...state,
    webJoke: { ...state.webJoke, loading: false, joke: action.payload },
  };
};

const onWebJokeError = (state: JokeState, action: WebJokeErrorAction) => {
  return {
    ...state,
    webJoke: { ...state.webJoke, loading: false, error: action.payload },
  };
};

const jokeReducer = (state = initialState, action: JokeActionTypes): JokeState => {
  switch (action.type) {
    case WEB_JOKE_LOADING:
      return onWebJokeLoading(state);
    case WEB_JOKE_LOADED:
      return onWebJokeLoaded(state, action);
    case WEB_JOKE_ERROR:
      return onWebJokeError(state, action);
    default:
      return state;
  }
};

export default jokeReducer;
