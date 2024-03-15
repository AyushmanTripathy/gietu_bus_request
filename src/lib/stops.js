function coords(latitude, longitude) {
  return { longitude, latitude };
}

export const stopCoords = {
  "BN": coords(20.2960587, 85.8245398),
  "JJ": coords(200, 3000),
  "Trends": coords(900, 200)
}

export const stopNames = Object.keys(stopCoords);
