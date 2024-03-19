function coords(latitude, longitude) {
  return { longitude, latitude };
}

export const config = {
  maxStudentRequestTime: 30 * 60 * 1000,
  maxBusTime: 60 * 60 * 1000
}

export const admins = new Set(["ayushmantripathy2004@gmail.com"]);

export const routes = [
  ["SBI", "BN", "JJ", "Trends"],
  ["SBI", "BN", "OLD Gunupur", "Bikrampur"],
];

export const stopCoords = {
  SBI: coords(21, 86),
  BN: coords(20.2960587, 85.8245398),
  JJ: coords(200, 3000),
  "OLD Gunupur": coords(300, 200),
  Bikrampur: coords(100, 200),
  Trends: coords(900, 200),
};

export const stopNames = Object.keys(stopCoords);
