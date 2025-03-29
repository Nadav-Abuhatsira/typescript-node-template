import { RootState } from '../../store/rootReducer';

export function getWebJoke({ dadJokes }: RootState) {
  return dadJokes.joke;
}

export function loadingWebJoke({ dadJokes }: RootState) {
  return dadJokes.loading;
}

export function getWebJokeError({ dadJokes }: RootState) {
  return dadJokes.error;
}
