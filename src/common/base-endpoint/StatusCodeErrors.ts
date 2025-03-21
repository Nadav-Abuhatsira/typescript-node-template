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

/**
 * Error that has a NOT_FOUND status code
 */
export class NotFoundError extends StatusCodeError {
  /**
   * @param message The error message
   */
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}
