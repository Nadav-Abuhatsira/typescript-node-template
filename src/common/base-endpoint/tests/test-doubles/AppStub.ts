import { Application } from 'express';
import sinon from 'sinon';
import request, { Response } from 'supertest';
import AppFactory from '../../../../express-server/AppFactory';

export default class AppStub {
  sandbox: sinon.SinonSandbox;

  server: Application;

  constructor(sandbox: sinon.SinonSandbox) {
    this.sandbox = sandbox;
    this.server = AppFactory.create();
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function throwIfErr(err: any, res: any, resolve: any): void {
  if (err) {
    throw err;
  } else {
    resolve(res);
  }
}

export async function sendOrgMgmtRequest(
  method: string,
  appStub: AppStub,
  url: string,
  body?: Record<string, unknown>
): Promise<Response> {
  const requestBuilder = request(appStub.server);
  let reqTest: any;
  switch (method) {
    case 'POST':
      reqTest = requestBuilder.post(url);
      break;
    case 'PUT':
      reqTest = requestBuilder.put(url);
      break;
    case 'GET':
      reqTest = requestBuilder.get(url);
      break;
    case 'DELETE':
      reqTest = requestBuilder.delete(url);
      break;
  }
  // if (userSubId) {
  //   reqTest.set('user-sub-id', userSubId);
  // }

  return new Promise((resolve) => {
    reqTest.send(body).expect('Content-Type', /json/);
    reqTest.end((err: any, res: any) => throwIfErr(err, res, resolve));
  });
}
