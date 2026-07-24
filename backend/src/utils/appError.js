/**
 * Custom Error Class for Operational Errors.
 * Used to send structured, user-friendly responses back to the client.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    // Client errors (4xx) set status to 'fail', server errors (5xx) set status to 'error'
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Operational errors are predictable runtime errors (validation, auth, not found, etc.)
    this.isOperational = true;

    // Capture the stack trace, keeping the constructor call out of the trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
