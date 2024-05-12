import { PROFILE_API } from "./api";


export const getUserVenues = async (username, accessToken, apiKey) => {
    const url = `${PROFILE_API}/${username}/venues?_venues=true`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });
    return response;
  };
  
  export const getUserBookings = async (username, accessToken, apiKey) => {
    const url = `${PROFILE_API}/${username}/bookings?_bookings=true`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });
    return response;
  };
  