function coords(latitude, longitude) {
  return { longitude, latitude };
}

export const config = {
  maxStudentRequestTime: 30 * 60 * 1000,
  maxBusTime: 60 * 60 * 1000,
  maxDistanceForRequest: 0.2,
};

export const admins = new Set([
  "vishnuprasadkorada@gmail.com",
  "ankit.choudhury0608@gmail.com",
  "ayushmantripathy2004@gmail.com",
]);

export const routes = [
  ["SBI", "BN", "JJ", "Trends"],
  ["SBI", "BN", "OLD Gunupur", "Bikrampur"],
];

export const stopCoords = {
  BN: coords(19.068599, 83.816309),
  SBI: coords(20.2960587, 85.8245398),
  JJ: coords(19.071408, 83.812883),
  "OLD Gunupur": coords(300, 200),
  Bikrampur: coords(100, 200),
  Trends: coords(19.07394, 83.809292),
};

export const stopNames = Object.keys(stopCoords);
