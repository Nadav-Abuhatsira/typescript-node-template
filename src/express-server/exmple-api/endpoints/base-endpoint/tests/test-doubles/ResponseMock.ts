import { SinonSandbox, SinonStub } from 'sinon';
import { Response } from 'express';

export default class ResponseMock {
  writeHead: SinonStub;

  end: SinonStub;

  constructor(sandbox: SinonSandbox) {
    this.writeHead = sandbox.stub();
    this.end = sandbox.stub();
  }

  get statusCode(): number {
    return this.writeHead.args[0][0];
  }

  get message(): unknown {
    return JSON.parse(this.end.args[0][0]);
  }

  get response(): Response {
    return this as unknown as Response;
  }
}
