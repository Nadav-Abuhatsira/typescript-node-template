import { Request, Response } from 'express';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

export default class BaseEndpointHandler {
  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  request: Request;

  response: Response;

  get body(): any {
    return this.request.body;
  }

  get params(): ParamsDictionary {
    return this.request.params;
  }

  get headers(): NodeJS.Dict<string | string[]> {
    return this.request.headers;
  }

  async getResponse(): Promise<void> {
    try {
      if (!(await this.isAuthorized())) {
        this.respond(StatusCodes.UNAUTHORIZED);
        return;
      }
      const responseContent = await this.getResponseContent();
      this.respond(StatusCodes.OK, responseContent);
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  async isAuthorized(): Promise<boolean> {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  async getResponseContent(): Promise<unknown> {
    throw new Error('getResponseContent function must be implemented');
  }

  handleError(error: Error): void {
    console.log(error.stack);
    const statusCode = _.get(error, 'statusCode');
    const statusCodeNumber = statusCode != null ? (statusCode as number) : StatusCodes.INTERNAL_SERVER_ERROR;
    const errorMsg = error.message != null ? error.message : error.toString();
    this.respond(statusCodeNumber, errorMsg);
  }

  respond(
    status: number,
    data?: unknown,
    contentType = 'application/json',
    extraHeaders?: Record<string, string>
  ): void {
    this.response.writeHead(status, {
      'Content-Type': contentType,
      ...extraHeaders,
    });
    this.response.end(JSON.stringify(data));
  }
}
