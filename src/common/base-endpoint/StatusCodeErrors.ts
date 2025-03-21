import { StatusCodes } from 'http-status-codes';

/**
 * Base class for errors that have an http status code
 */
export class StatusCodeError extends Error {
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;

  /**
   * @param statusCode The http status code number
   * @param message The error message
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends StatusCodeError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class BadRequestError extends StatusCodeError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
