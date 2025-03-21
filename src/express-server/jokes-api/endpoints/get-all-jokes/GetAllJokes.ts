import BaseEndpointHandler from '../../../../common/base-endpoint/BaseEndpointHandler';
import JokesRepository from '../../repositories/JokesRepository';

export default class GetAllJokes extends BaseEndpointHandler {
  async getResponseContent(): Promise<any> {
    return JokesRepository.getAllJokes();
  }
}
