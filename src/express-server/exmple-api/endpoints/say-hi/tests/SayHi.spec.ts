import expect from 'expect';
import { createSandbox } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import AppStub, { sendOrgMgmtRequest } from '../../base-endpoint/tests/test-doubles/AppStub';

describe('say hi endpoint tests', () => {
  const sandbox = createSandbox();
  let appStub: AppStub;

  async function sayHiEndpoint(body = {}): Promise<any> {
    const path = `/example-api/say-hi`;
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
      const res = await sayHiEndpoint();
      const { body, status } = res;
      expect(status).toEqual(StatusCodes.OK);
      expect(body).toEqual('hiiii 2224');
    });
  });
});
