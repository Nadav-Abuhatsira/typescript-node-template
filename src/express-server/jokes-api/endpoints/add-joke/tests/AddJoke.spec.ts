import expect from 'expect';
import { createSandbox } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import AppStub, { sendOrgMgmtRequest } from '../../../../common/base-endpoint/tests/test-doubles/AppStub';
import JokesRepository from '../../../repositories/JokesRepository';

describe('AddJoke endpoint tests', () => {
  const sandbox = createSandbox();
  let appStub: AppStub;

  async function AddJokeEndpoint(body = {}): Promise<any> {
    const path = `/jokes-api/add-joke`;
    return sendOrgMgmtRequest('POST', appStub, path, body);
  }

  beforeEach(() => {
    appStub = new AppStub(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when valid request is sent', () => {
    it('should return a refreshed token in expected format', async () => {
      const joke = 'very-funny-joke';
      const res = await AddJokeEndpoint({ joke });
      const { body, status } = res;
      expect(status).toEqual(StatusCodes.OK);
      expect(body.joke).toEqual(joke);
      expect(body.id).toBeDefined();
      const allJokes = JokesRepository.getAllJokes();
      const lastJoke = allJokes[allJokes.length - 1];
      expect(lastJoke.joke).toEqual(joke);
      expect(lastJoke.id).toBeDefined();
    });
  });

  context('validate request', () => {
    it('should return bas request if joke is missing in the body', async () => {
      const res = await AddJokeEndpoint();
      const { body, status } = res;
      expect(status).toEqual(StatusCodes.BAD_REQUEST);
      expect(body).toEqual(`'joke': Invalid value`);
    });
  });
});
