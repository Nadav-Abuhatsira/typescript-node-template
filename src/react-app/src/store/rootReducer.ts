import { combineReducers } from 'redux';
import jokeReducer, { JokeState } from '../DadJokes/reducer/jokeReducer';

export interface RootState {
  dadJokes: JokeState;
}

const rootReducer = combineReducers({
  dadJokes: jokeReducer,
});

export default rootReducer;
