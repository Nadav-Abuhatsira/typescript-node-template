import expect from 'expect';
import BaseEndpointHandler from '../BaseEndpointHandler';
import sinon, { createSandbox } from 'sinon';
import ResponseMock from './test-doubles/ResponseMock';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, StatusCodeError } from '../StatusCodeErrors';

describe('BaseEndpointHandler tests', () => {
  const sandbox = createSandbox();
  let response: ResponseMock;

  beforeEach(() => {
    response = new ResponseMock(sandbox);
  });

  context('handleError', () => {
    const request = { body: 'some-body' } as Request;
    it('responds with INTERNAL_SERVER_ERROR foe unknown error', () => {
      const err = new Error('I am just an innocent error');
      const endpointHandler = new BaseEndpointHandler(request, response.response);
      endpointHandler.handleError(err);
      expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.message).toBe(err.message);
    });

    it('responds with the status code if the error has status code', () => {
      const err = new StatusCodeError(StatusCodes.NOT_FOUND, 'where am I');
      const endpointHandler = new BaseEndpointHandler(request, response.response);
      endpointHandler.handleError(err);
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.message).toBe(err.message);
    });

    it('responds with the not found status code', () => {
      const err = new NotFoundError('where am I');
      const endpointHandler = new BaseEndpointHandler(request, response.response);
      endpointHandler.handleError(err);
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.message).toBe(err.message);
    });

    it('responds with INTERNAL_SERVER_ERROR error if unknown error', () => {
      const errMsg = 'unknown error';
      const endpointHandler = new BaseEndpointHandler(request, response.response);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - we want to test this
      endpointHandler.handleError(errMsg);
      expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.message).toBe(errMsg);
    });

    it('throws an error is getResponseContent is not implemented', async () => {
      const endpointHandler = new BaseEndpointHandler(request, response.response);
      await endpointHandler.getResponse();
      expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.message).toBe(`getResponseContent function must be implemented`);
    });

    it('throws an error isAuthorized return false', async () => {
      const endpointHandler = new BaseEndpointHandler(request, response.response);
      sinon.stub(endpointHandler, 'isAuthorized').resolves(false);
      await endpointHandler.getResponse();
      expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  it('return the request body', async () => {
    const request = { body: 'nice-body' } as Request;
    const endpointHandler = new BaseEndpointHandler(request, response.response);
    expect(endpointHandler.body).toEqual(request.body);
  });

  it('return the request params', async () => {
    const request = { params: {} } as Request;
    const endpointHandler = new BaseEndpointHandler(request, response.response);
    expect(endpointHandler.params).toEqual(request.params);
  });

  it('return the request headers', async () => {
    const request = { headers: { accept: 'application/json' } } as Request;
    const endpointHandler = new BaseEndpointHandler(request, response.response);
    expect(endpointHandler.headers).toEqual(request.headers);
  });
});
