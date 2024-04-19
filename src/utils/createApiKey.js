import { API_URL } from "./api";

const method = "POST";

export const createApiKey = async (accessToken) => {
  const apiKeyURL = `${API_URL}/auth/create-api-key`;
  try {
    const response = await fetch(apiKeyURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create API key: ${errorMessage}`);
    }

    const data = await response.json();
    return data.data; 
  } catch (error) {
    throw new Error(`Failed to create API key: ${error.message}`);
  }
};
