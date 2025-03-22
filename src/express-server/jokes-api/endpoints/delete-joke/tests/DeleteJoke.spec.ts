import expect from 'expect';
import { createSandbox } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import AppStub, { sendOrgMgmtRequest } from '../../../../common/base-endpoint/tests/test-doubles/AppStub';
import JokesRepository from '../../../repositories/JokesRepository';

describe('DeleteJoke endpoint tests', () => {
  const sandbox = createSandbox();
  let appStub: AppStub;

  async function DeleteJokeEndpoint(jokeId: string): Promise<any> {
    const path = `/jokes-api/delete-joke/${jokeId}`;
    return sendOrgMgmtRequest('DELETE', appStub, path);
  }

  beforeEach(() => {
    appStub = new AppStub(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when valid request is sent', () => {
    it('should delete the joke', async () => {
      JokesRepository.deleteAllJokes();
      const joke = JokesRepository.addJoke('not funny joke');
      let allJokes = JokesRepository.getAllJokes();
      expect(allJokes).toHaveLength(1);
      const res = await DeleteJokeEndpoint(joke.id);
      const { status } = res;
      expect(status).toEqual(StatusCodes.OK);
      allJokes = JokesRepository.getAllJokes();
      expect(allJokes).toHaveLength(0);
    });
  });
});
