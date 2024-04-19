import { apiFetch } from './api'



const registerUser = async (userData) => {
  const action = '/auth/register';
  const method = 'POST';

  try {
    return await apiFetch(action, method, userData);
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const loginUser = async (userData) => {
  const action = '/auth/login';
  const method = 'POST';

  try {
    return await apiFetch(action, method, userData);
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export { registerUser, loginUser };