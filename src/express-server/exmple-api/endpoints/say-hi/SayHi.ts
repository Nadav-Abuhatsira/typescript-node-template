import BaseEndpointHandler from '../base-endpoint/BaseEndpointHandler';

export default class SayHi extends BaseEndpointHandler {
  async getResponseContent(): Promise<any> {
    return 'hiiii 2224';
  }
}
