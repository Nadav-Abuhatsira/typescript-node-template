import expect from 'expect';
import { createSandbox } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import AppStub, { sendOrgMgmtRequest } from '../../../../../common/base-endpoint/tests/test-doubles/AppStub';

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
    it('should return a refreshed token in expected format', async () => {
      const res = await GetAllJokesEndpoint();
      const { body, status } = res;
      expect(status).toEqual(StatusCodes.OK);
      expect(body).toEqual([{ id: 'joke1-id', joke: 'dummy-joke1' }]);
    });
  });
});
