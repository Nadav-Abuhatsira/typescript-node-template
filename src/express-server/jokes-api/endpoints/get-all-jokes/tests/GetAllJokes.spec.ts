import expect from 'expect';
import { createSandbox } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import AppStub, { sendOrgMgmtRequest } from '../../../../common/base-endpoint/tests/test-doubles/AppStub';
import JokesRepository from '../../../repositories/JokesRepository';

describe('GetAllJokes endpoint tests', () => {
  const sandbox = createSandbox();
  let appStub: AppStub;

  async function GetAllJokesEndpoint(body = {}): Promise<any> {
    const path = `/jokes-api/get-all`;
    return sendOrgMgmtRequest('GET', appStub, path, body);
  }

  beforeEach(() => {
    appStub = new AppStub(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when valid request is sent', () => {
    it('should return all jokes', async () => {
      const joke = 'dummy-joke1';
      JokesRepository.deleteAllJokes();
      JokesRepository.addJoke(joke);
      const res = await GetAllJokesEndpoint();
      const { body, status } = res;
      expect(status).toEqual(StatusCodes.OK);
      expect(body.length).toBe(1);
      const firstJoke = body[0];
      expect(firstJoke.id).toBeDefined();
      expect(firstJoke.joke).toEqual(joke);
    });
  });
});
