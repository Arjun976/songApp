// src/api/payments.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const paymentsApi = axios.create({
  baseURL: `${API_BASE_URL}/payments`,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }
  return { Authorization: `Bearer ${token}` };
};

/**
 * Creates a Stripe Checkout session for purchasing a song.
 * @param {string} songId - The ID of the song to purchase.
 * @returns {Promise<string>} The URL for the Stripe Checkout page.
 */
export const createCheckoutSession = async (songId) => {
  try {
    const headers = getAuthHeaders();
    const response = await paymentsApi.post(
      "/create-checkout-session",
      { songId },
      { headers }
    );
    return response.data.checkoutUrl;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error.response?.data?.message || error.message);
    throw new Error("Could not initiate payment. Please try again.");
  }
};

/**
 * Verifies a Stripe Checkout session after the user returns to the app.
 * @param {string} sessionId - The ID of the Stripe Checkout session.
 * @returns {Promise<any>} The response data from the server.
 */
export const verifyPaymentSession = async (sessionId) => {
    try {
        const headers = getAuthHeaders();
        const response = await paymentsApi.get(
            `/verify-session/${sessionId}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error verifying Stripe session:", error.response?.data?.message || error.message);
        throw new Error("Could not verify payment. If you paid, please contact support.");
    }
};

