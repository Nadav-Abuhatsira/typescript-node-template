import { ThunkDispatch } from 'redux-thunk';
import { webJokeError, webJokeLoading, webJokeLoaded, JokeActionTypes } from './action-types';
import { getRandomJokeFromWeb } from '../api/jokes-api';
import { toast } from 'react-toastify';

export const fetchWebJoke = () => {
  return async (dispatch: ThunkDispatch<{}, {}, JokeActionTypes>) => {
    dispatch(webJokeLoading());
    try {
      const joke = await getRandomJokeFromWeb();
      dispatch(webJokeLoaded(joke));
    } catch (error: any) {
      dispatch(webJokeError(error));
      toast('Error getting a joke from web');
    }
  };
};
