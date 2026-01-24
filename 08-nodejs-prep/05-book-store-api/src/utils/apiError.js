// ApiError is a custom error class for APIs
// It EXTENDS JavaScript's built-in Error class
class ApiError extends Error {
  // Constructor runs when you create a new ApiError
  constructor(
    statusCode, // HTTP status code (400, 401, 404, 500)
    message = "Something went wrong", // Default error message
    errors = [], // Extra error details (validation errors)
    stack = "", // Optional stack trace
  ) {
    // Call the parent Error class constructor
    // This sets the error message properly
    super(message);

    // Store HTTP status code
    this.statusCode = statusCode;

    // Always keep data as null for errors
    this.data = null;

    // Store the error message
    this.message = message;

    // success is always false for errors
    this.success = false;

    // Store detailed errors (if any)
    this.errors = errors;

    // If stack trace is manually provided, use it
    if (stack) {
      this.stack = stack;
    } else {
      // Otherwise, automatically capture stack trace
      // Helps in debugging (shows where error happened)
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export to use anywhere in the app
export { ApiError };
