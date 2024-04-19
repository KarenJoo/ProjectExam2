import { API_URL } from "./api";

const registerAction = '/auth/register';
const loginAction = '/auth/login';
const method = "POST";

export const registerUser = async (userData) => {
  const registerURL = API_URL + registerAction;
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
  

  export const loginUser = async ({ email, password, avatar, venueManager }) => {
    const loginURL = API_URL + loginAction;
    const body = JSON.stringify({ email, password, avatar, venueManager });
  
    try {
      const response = await fetch(loginURL, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Login failed: ${errorMessage}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  };