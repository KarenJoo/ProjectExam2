import { PROFILE_API } from "./api";

export const getUserVenues = async (username, accessToken, apiKey, isVenueManager) => {
  let url;
  if (isVenueManager) {
    // Fetch venues for venue managers
    url = `${PROFILE_API}/${username}/venues?_venues=true`;
  } else {
    // Fetch bookings for customers
    url = `${PROFILE_API}/${username}/venues?_bookings=true`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': apiKey,
    },
  });
  return response;
};
