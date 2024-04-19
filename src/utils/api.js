export const API_BASE_URL = "https://v2.api.noroff.dev/holidaze";
export const VENUES_URL = `${API_BASE_URL}/venues`;
export const API_URL = "https://v2.api.noroff.dev"
export const CREATE_API_KEY = `${API_URL}/auth/create-api-key`;




export const apiFetch = async (action, method, body) => {
    const url = `${API_URL}${action}`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Request failed: ${errorMessage}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  };
  