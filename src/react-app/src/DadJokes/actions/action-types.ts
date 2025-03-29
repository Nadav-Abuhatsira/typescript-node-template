export const WEB_JOKE_LOADING = 'WEB_JOKE_LOADING';
export const WEB_JOKE_LOADED = 'WEB_JOKE_LOADED';
export const WEB_JOKE_ERROR = 'WEB_JOKE_ERROR';

export interface WebJokeLoadingAction {
  type: typeof WEB_JOKE_LOADING;
}

export interface WebJokeLoadedAction {
  type: typeof WEB_JOKE_LOADED;
  payload: string;
}

export interface WebJokeErrorAction {
  type: typeof WEB_JOKE_ERROR;
  payload: string;
}

export type JokeActionTypes = WebJokeLoadingAction | WebJokeLoadedAction | WebJokeErrorAction;

export const webJokeLoading = (): WebJokeLoadingAction => ({
  type: WEB_JOKE_LOADING,
});

export const webJokeLoaded = (joke: string): WebJokeLoadedAction => ({
  type: WEB_JOKE_LOADED,
  payload: joke,
});

export const webJokeError = (error: string): WebJokeErrorAction => ({
  type: WEB_JOKE_ERROR,
  payload: error,
});
