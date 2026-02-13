/**
 * QuickServe Geo-Logic
 * Simulates "Smart Geo-Fencing" and "Instant Allocation".
 */

// Mock list of helpers with their coordinates (relative to a center point)
const MOCK_HELPERS = [
  { id: 1, name: "Cleaning Pro (Ramu)", service: "Cleaning", lat: 0.005, lng: 0.005, rating: 4.8 }, // ~700m away
  { id: 2, name: "Fix-It Somu", service: "Plumbing", lat: -0.01, lng: 0.002, rating: 4.5 }, // ~1.2km away
  { id: 3, name: "Sparky Tech", service: "Electrician", lat: 0.001, lng: -0.008, rating: 4.9 }, // ~900m away
  { id: 4, name: "Pest Expert", service: "Pest Control", lat: 0.015, lng: 0.015, rating: 4.7 }, // ~2.5km (Might be too far)
  { id: 5, name: "Fast Clean", service: "Cleaning", lat: -0.003, lng: -0.003, rating: 4.6 }, // ~500m away
];

/**
 * Simulates fetching user location.
 * In a real app, this would use navigator.geolocation.
 */
export const getUserLocation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ lat: 0, lng: 0 }); // Center point (e.g., Campus/Home)
    }, 1500); // Fake delay for realism
  });
};

/**
 * Calculates distance between two coordinates in km (Haversine approx for small distances).
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

/**
 * Finds the nearest helper for a given service within a 2km radius.
 */
export const findNearestHelper = (serviceType, userLat, userLng) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const candidates = MOCK_HELPERS.filter(h => h.service === serviceType);
      
      let nearest = null;
      let minDist = Infinity;

      candidates.forEach(helper => {
        const dist = calculateDistance(userLat, userLng, helper.lat, helper.lng);
        if (dist <= 2.0 && dist < minDist) { // 2km Radius Check
          minDist = dist;
          nearest = { ...helper, distance: dist.toFixed(2) };
        }
      });

      resolve(nearest);
    }, 2000); // Searching Duration
  });
};

/**
 * Calculates ETA based on distance (assuming avg speed 20km/h in city).
 */
export const calculateETA = (distanceKm) => {
  const speed = 20; // km/h
  const timeHours = distanceKm / speed;
  const timeMins = Math.ceil(timeHours * 60) + 5; // +5 mins buffer
  return `${timeMins} mins`;
};

export const generateBookingID = () => {
    return `QS-${Math.floor(1000 + Math.random() * 9000)}`;
};
