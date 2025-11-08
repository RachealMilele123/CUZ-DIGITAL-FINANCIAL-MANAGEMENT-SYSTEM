import { toast } from "react-toastify";

// Helper function to get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Success response (status 200-299)
      console.log("Login successful:", data);
      return {
        success: true,
        data: data,
        token: data.token,
        user: data.user,
      };
    } else {
      // Error response (status 400-599)
      console.error("Login failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Login failed. Please try again.",
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

export const registerUser = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("Registration response:", data);

    if (response.ok) {
      toast.success("Registration successful!");
      return { success: true, data };
    } else {
      const errorMessage = data.error || data.message || "Unknown error";
      toast.error(`Registration failed: ${errorMessage}`);
      return { success: false, error: errorMessage, data };
    }
  } catch (error) {
    console.error("Network error:", error);
    toast.error("Network error. Please check your connection and try again.");
    return { success: false, error: "Network error", data: null };
  }
};

export const accountBalance = async () => {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "No authentication token found. Please login again.",
      };
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/balance`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log("Account Balance response:", data);

    if (response.ok) {
      // Success response (status 200-299)
      return {
        success: true,
        data: data,
      };
    } else {
      // Error response (status 400-599)
      console.error("Account Balance failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Account Balance failed. Please try again.",
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

export const transaction = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/transfer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("Transaction response:", data);

    if (response.ok) {
      // Success response (status 200-299)
      toast.success("Transaction successful!");
      return {
        success: true,
        data: data,
      };
    } else {
      // Error response (status 400-599)
      toast.error("Transaction failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Transaction failed. Please try again.",
      };
    }
  } catch (error) {
    toast.error("Network error:", error.message);

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

export const transactionHistory = async (accountNumber) => {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "No authentication token found. Please login again.",
      };
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/transactions/${accountNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log("Transaction History response:", data);

    if (response.ok) {
      // Success response (status 200-299)
      return {
        success: true,
        data: data,
      };
    } else {
      // Error response (status 400-599)
      console.error("Transaction History failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Transaction History failed. Please try again.",
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

export const depositFunds = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/deposit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("Deposit response:", data);

    if (response.ok) {
      // Success response (status 200-299)
      toast.success("Deposit successful!");
      return {
        success: true,
        data: data,
      };
    } else {
      // Error response (status 400-599)
      toast.error("Deposit failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Deposit failed. Please try again.",
      };
    }
  } catch (error) {
    toast.error("Network error:", error.message);

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

export const getRecentDeposits = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/deposits/recent`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("Recent Deposits response:", data);

    if (response.ok) {
      // Success response (status 200-299)
      return {
        success: true,
        data: data,
      };
    } else {
      // Error response (status 400-599)
      console.error("Recent Deposits failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Recent Deposits failed. Please try again.",
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

export const getDeposits = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cuz/bank/deposits`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("Deposit response:", data);

    if (response.ok) {
      // Success response (status 200-299)
      return {
        success: true,
        data: data,
      };
    } else {
      // Error response (status 400-599)
      console.error("Deposit failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Deposit failed. Please try again.",
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
