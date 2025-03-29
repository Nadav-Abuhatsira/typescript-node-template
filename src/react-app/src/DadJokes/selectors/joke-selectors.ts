import { JokeState } from '../reducer/jokeReducer';

export function getWebJoke(state: JokeState) {
  return state.joke;
}

export function loadingWebJoke(state: JokeState) {
  return state.loading;
}

export function getWebJokeError(state: JokeState) {
  return state.error;
}