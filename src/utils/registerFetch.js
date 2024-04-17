import { API_URL } from "./api";

const action = '/auth/register'
const method = "POST";

export const registerUser = async (userData) => {
  const registerURL = API_URL + action;
  const body = JSON.stringify(userData);
    try {
      const response = await fetch(registerURL, {
        
        headers: {
          'Content-Type': 'application/json',
        },
        method,
        body
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Registration failed: ${errorMessage}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  };
  