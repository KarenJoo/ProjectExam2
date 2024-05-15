
export function filterVenues(venues, searchTerm) {
    return venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  