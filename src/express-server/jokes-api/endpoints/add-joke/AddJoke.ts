import BaseEndpointHandler from '../../../../common/base-endpoint/BaseEndpointHandler';
import JokesRepository from '../../repositories/JokesRepository';
import { BadRequestError } from '../../../../common/base-endpoint/StatusCodeErrors';

export default class AddJoke extends BaseEndpointHandler {
  async getResponseContent(): Promise<any> {
    this.validateBody();
    const { joke } = this.body;
    JokesRepository.addJoke(joke);
    return 'OK';
  }

  validateBody(): void {
    const { joke } = this.body;
    if (!joke) throw new BadRequestError(`'joke': Invalid value`);
  }
}
