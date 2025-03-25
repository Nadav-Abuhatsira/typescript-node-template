import expect from 'expect';
import { createSandbox } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import AppStub, { sendOrgMgmtRequest } from '../../../../common/base-endpoint/tests/test-doubles/AppStub';

describe('GetPlaylist endpoint tests', () => {
  const sandbox = createSandbox();
  let appStub: AppStub;

  async function getPlaylistEndpoint(body = {}): Promise<any> {
    const path = `/pearson/get-playlist`;
    return sendOrgMgmtRequest('GET', appStub, path, body);
  }

  beforeEach(() => {
    appStub = new AppStub(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when valid request is sent', () => {
    it('should return a the playlist', async () => {
      const res = await getPlaylistEndpoint();
      const { status } = res;
      expect(status).toEqual(StatusCodes.OK);
    });
  });
});
