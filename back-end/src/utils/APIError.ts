interface ErrorParams {
  message: string;
  errors?: any;
  status?: number;
  isPublic?: boolean;
  stack?: string;
}

/**
 * @extends Error
 */
class ExtendableError extends Error {
  public errors?: any;
  public status: number;
  public isPublic: boolean;

  constructor({ message, errors, status = 500, isPublic = true, stack }: ErrorParams) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} [status=500] - HTTP status code of error.
   * @param {boolean} [isPublic=true] - Whether the message should be visible to the user or not.
   */
  constructor({ message, errors, stack, status = 500, isPublic = true }: ErrorParams) {
    super({ message, errors, status, isPublic, stack });
  }
}

export default APIError;
