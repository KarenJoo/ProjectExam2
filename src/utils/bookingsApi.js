import { API_BASE_URL } from "./api";


export const createBooking = async (accessToken, bookingData, apiKey) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': apiKey,


        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }
  
      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      throw new Error('Failed to create booking: ' + error.message);
    }
  };