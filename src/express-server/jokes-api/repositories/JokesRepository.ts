import { v4 as uuidv4 } from 'uuid';

export default class GetAllJokesRepository {
  private static jokes: any[] = [];

  static getAllJokes(): any[] {
    return this.jokes;
  }

  static addJoke(joke: string): any {
    const jokeElm = { id: uuidv4(), joke };
    this.jokes.push(jokeElm);
    return jokeElm;
  }

  static deleteAllJokes(): void {
    this.jokes = [];
  }

  static deleteJoke(jokeId: string): void {
    this.jokes = this.jokes.filter((joke: any) => joke.id !== jokeId);
  }
}
