// Utility functions for handling API responses and token expiry

// Reference to the auth context handler - will be set by the AuthProvider
let tokenExpiryHandler = null;

// Function to set the token expiry handler from AuthContext
export const setTokenExpiryHandler = (handler) => {
  tokenExpiryHandler = handler;
};

// Function to handle API responses and check for token expiry
export const handleApiResponse = async (response) => {
  // Check if the response indicates token expiry (401 Unauthorized)
  if (response.status === 401) {
    console.log("API returned 401 - Token expired");

    // Call the token expiry handler if it's available
    if (tokenExpiryHandler) {
      tokenExpiryHandler();
    }

    // Return a standardized error response
    return {
      success: false,
      error: "Your session has expired. Please log in again.",
      tokenExpired: true,
    };
  }

  // For other responses, let the calling code handle them normally
  return null;
};

// Enhanced fetch wrapper that automatically handles token expiry
export const fetchWithTokenHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    // Check for token expiry first
    const tokenExpiryResult = await handleApiResponse(response);
    if (tokenExpiryResult) {
      return tokenExpiryResult;
    }

    // Parse response data
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
        response: response,
      };
    } else {
      return {
        success: false,
        error: data.error || data.message || "Request failed",
        data: data,
        status: response.status,
      };
    }
  } catch (error) {
    console.error("Network error:", error.message);

    if (error.message === "Failed to fetch") {
      return {
        success: false,
        error:
          "Unable to connect to server. Please ensure the backend server is running on http://localhost:8000",
      };
    } else {
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      };
    }
  }
};
