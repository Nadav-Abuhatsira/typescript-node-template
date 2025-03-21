import { v4 as uuidv4 } from 'uuid';

export default class GetAllJokesRepository {
  private static jokes: any[] = [];

  static getAllJokes(): any[] {
    return this.jokes;
  }

  static addJoke(joke: string): void {
    this.jokes.push({ id: uuidv4(), joke });
  }

  static deleteAllJokes(): void {
    this.jokes = [];
  }
}
