import BaseEndpointHandler from '../../../common/base-endpoint/BaseEndpointHandler';
import JokesRepository from '../../repositories/JokesRepository';

export default class DeleteJoke extends BaseEndpointHandler {
  async getResponseContent(): Promise<any> {
    const { jokeId } = this.params;
    return JokesRepository.deleteJoke(jokeId);
  }
}
