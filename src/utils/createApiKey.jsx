import { API_URL } from './api';

export const createApiKey = async (accessToken) => {
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const apiKeyURL = `${API_URL}/auth/create-api-key`;

  try {
    const response = await fetch(apiKeyURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: 'API_KEY' }), // Optional: Provide a name
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create API key: ${errorMessage}`);
    }

    const data = await response.json();
    const apiKey = data.data.key;

    return apiKey;
  } catch (error) {
    console.error('Error creating API key:', error);
    throw new Error(`Failed to create API key: ${error.message}`);
  }
};
