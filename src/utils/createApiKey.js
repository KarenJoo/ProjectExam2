import { API_URL } from "./api";

const action = '/auth/create-api-key'
const method = "POST";

export const createApiKey = async () => {
    const createApiKey = API_URL + action;
    try {
        const response = await fetch(createApiKey, {
headers: {
    'Content-Type': 'application/json',
},
method
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to create API key: ${errorMessage}`);
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          throw new Error(`Failed to create API key: ${error.message}`);
        }
      };