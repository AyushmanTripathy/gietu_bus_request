function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

export function distanceInKm(coord1, coord2) {
  const dLat = degreesToRadians(coord2.latitude - coord1.latitude);
  const dLon = degreesToRadians(coord2.longitude - coord1.longitude);
  const lat1 = degreesToRadians(coord1.latitude);
  const lat2 = degreesToRadians(coord2.latitude);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return 6371 * c;
}

