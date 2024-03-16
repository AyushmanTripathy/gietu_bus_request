import { distanceInKm } from "$lib/utils.js";
import { json } from "@sveltejs/kit";
import { stopCoords, stopNames }from "$lib/stops.js";

const studentRequests = {};
const busStopRequests = {};
for (const name of stopNames) busStopRequests[name] = new Set();

export async function GET({ request }) {
  const busWaitingCount = [];
  for (const name in busStopRequests) 
    busWaitingCount.push([name, busStopRequests[name].size]);
  return json(busWaitingCount);
}

export async function DELETE({ request }) {
  const data = await request.formData();
  const email = data.get("email");
  if (!studentRequests[email]) 
    return json({ success: false, msg: "No requests from user" });
  busStopRequests[studentRequests[email]].delete(email);
  delete studentRequests[email];
  return json({ success: true });
}

export async function POST({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  if (studentRequests[email]) 
    return json({ success: false, msg: "Already requested for " + studentRequests[email]});

  // getting the nearest busstop
  const loc = JSON.parse(data.get("loc"));
  let best = 0, min = distanceInKm(stopCoords[stopNames[0]], loc);
  for (let i = 1; i < stopNames.length; i++) {
    const dist = distanceInKm(stopCoords[stopNames[i]], loc);
    if (min > dist) {
      min = dist;
      best = i;
    }
  }
  best = stopNames[best];

  // not near to any stops
  if (min > 0.1) return json({ success: false, msg: "You are not close to any bus stops yet." });

  busStopRequests[best].add(email);
  studentRequests[email] = best;
  console.log(busStopRequests)
  return json({ success: true, stopName: best });
}
