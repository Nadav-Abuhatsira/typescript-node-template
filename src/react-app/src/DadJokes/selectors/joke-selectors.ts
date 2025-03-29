import { RootState } from '../../store/rootReducer';

export function getWebJoke({ dadJokes }: RootState) {
  return dadJokes.webJoke.joke;
}

export function loadingWebJoke({ dadJokes }: RootState) {
  return dadJokes.webJoke.loading;
}

export function getWebJokeError({ dadJokes }: RootState) {
  return dadJokes.webJoke.error;
}
