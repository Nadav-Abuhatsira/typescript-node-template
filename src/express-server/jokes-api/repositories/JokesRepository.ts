export default class GetAllJokesRepository {
  private static jokes = [{ id: 'joke1-id', joke: 'dummy-joke1' }];

  static getAllJokes(): any[] {
    return this.jokes;
  }
}
