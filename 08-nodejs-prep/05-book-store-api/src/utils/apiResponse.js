// ApiResponse is a standard success response wrapper
class ApiResponse {
  // Constructor runs when you create a new ApiResponse
  constructor(
    statusCode, // HTTP status code (200, 201, 204)
    message = "Success", // Default success message
    data = null, // Actual response data
  ) {
    // Store HTTP status code
    this.statusCode = statusCode;

    // Store response data
    this.data = data;

    // Store success message
    this.message = message;

    // Automatically determine success
    // Any status code below 400 means success
    this.success = statusCode < 400;
  }
}

// Export so controllers can use it
export { ApiResponse };
