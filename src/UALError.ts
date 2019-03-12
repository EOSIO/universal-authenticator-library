/**
 * Types of errors that the UALError class can represent
 */
export enum UALErrorType {
  UAL = 'UAL',    // Generic error
  Login = 'Login',
  Logout = 'Logout',
  Signing = 'Signing',
  Validation = 'Validation',
  Initialization = 'Initialization',  // Covers situations like Scatter.connect, module not loading, etc.
  DataRequest = 'DataRequest',        // Errors fetching data like accountName, keys, etc.
  Unsupported = 'Unsupported',        // Thrown from an unsupported operation
}

/**
 * Base error class for UAL errors.
 */
export class UALError extends Error {
  /**
   * The type of the error
   */
  public readonly type: UALErrorType

  /**
   * The underlying Error (if any) that caused the current error.
   */
  public readonly cause: Error | null

  /**
   * The name of the authenticator that is the source of the error.
   */
  public readonly source: string

  /**
   * @param message Message describing the error
   *
   * @param source The name of the authenticator that is the source of the error
   *
   * @param cause The underlying Error (if any) that resulted in the current one being thrown
   */
  constructor(message: string, type: UALErrorType, cause: Error | null, source: string) {
    super(message)

    this.type = type
    this.cause = cause
    this.source = source
  }
}
