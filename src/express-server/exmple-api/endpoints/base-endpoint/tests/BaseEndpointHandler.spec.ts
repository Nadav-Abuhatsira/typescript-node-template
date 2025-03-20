// import expect from 'expect';
// import { StatusCodeError } from '@biorad-lsg/services-api-common';
// import BaseEndpointHandler from '../BaseEndpointHandler';
// import { createSandbox } from 'sinon';
// import ResponseMock from './tests-doubles/ResponseMock';
// import { StatusCodes } from 'http-status-codes';
// import { Request } from 'express';
//
// describe('BaseEndpointHandler tests', () => {
//   const sandbox = createSandbox();
//   let response: ResponseMock;
//
//   beforeEach(() => {
//     response = new ResponseMock(sandbox);
//   });
//
//   context('handleError', () => {
//     it('responds with INTERNAL_SERVER_ERROR foe unknown error', () => {
//       const err = new Error('I am just an innocent error');
//       BaseEndpointHandler.handleError(err, response.response);
//       expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
//       expect(response.message).toBe(err.message);
//     });
//
//     it('responds with the status code if the error has status code', () => {
//       const err = new StatusCodeError(StatusCodes.NOT_FOUND, 'where am I');
//       BaseEndpointHandler.handleError(err, response.response);
//       expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
//       expect(response.message).toBe(err.message);
//     });
//
//     it('responds with INTERNAL_SERVER_ERROR error if unknown error', () => {
//       const errMsg = 'unknown error';
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore - we want to tests this
//       BaseEndpointHandler.handleError(errMsg, response.response);
//       expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
//       expect(response.message).toBe(errMsg);
//     });
//   });
//
//   it('throws an error is getResponseContent is not implemented', async () => {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     const endpointHandler = new BaseEndpointHandler(null, null);
//     await expect(endpointHandler.getResponseContent()).rejects.toThrow(
//       new Error(`getResponseContent function must be implemented`)
//     );
//   });
//
//   it('return the request body', async () => {
//     const request = { body: 'nice-body' } as Request;
//     const endpointHandler = new BaseEndpointHandler(request, response.response);
//     expect(endpointHandler.body).toEqual(request.body);
//   });
//
//   it('return the request params', async () => {
//     const request = { params: {} } as Request;
//     const endpointHandler = new BaseEndpointHandler(request, response.response);
//     expect(endpointHandler.params).toEqual(request.params);
//   });
// });
