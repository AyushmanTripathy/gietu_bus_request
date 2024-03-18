import { distanceInKm } from "$lib/utils.js";
import { error, json } from "@sveltejs/kit";
import { admins, stopCoords, routes, stopNames } from "$lib/info.js";

const studentRequests = {};
const busStopRequests = {};
for (const name of stopNames)
  busStopRequests[name] = { count: 0, fullfilled: false };

export async function GET({ locals }) {
  const session = await locals.getSession();
  if (!session) {
    throw error(401, "Forbidden");
  }

  return json({
    busStopRequests,
    isAdmin: admins.has(session.user.email),
  });
}

export async function DELETE({ locals }) {
  const session = await locals.getSession();
  if (!session) {
    throw error(401, "Forbidden");
  }

  const email = session.user.email;
  if (!studentRequests[email])
    return json({ success: false, msg: "No requests from user" });

  busStopRequests[studentRequests[email]].count--;
  delete studentRequests[email];
  return json({ success: true });
}

export async function POST({ request, locals }) {
  const session = await locals.getSession();
  if (!session) {
    throw error(401, "Forbidden");
  }

  const loc = await request.json();
  const email = session.user.email;

  if (studentRequests[email])
    return json({
      success: false,
      msg: "Already requested for " + studentRequests[email],
    });

  // getting the nearest busstop
  let best = 0,
    min = distanceInKm(stopCoords[stopNames[0]], loc);
  for (let i = 1; i < stopNames.length; i++) {
    const dist = distanceInKm(stopCoords[stopNames[i]], loc);
    if (min > dist) {
      min = dist;
      best = i;
    }
  }
  best = stopNames[best];

  // not near to any stops
  if (min > 0.1)
    return json({
      success: false,
      msg: "You are not close to any bus stops yet.",
    });

  busStopRequests[best].count++;
  studentRequests[email] = best;
  console.log(busStopRequests);
  return json({ success: true, stopName: best });
}

export async function PATCH({ request, locals }) {
  const session = await locals.getSession();
  if (!session || !admins.has(session.user.email)) {
    throw error(401, "Forbidden");
  }

  const no = await request.json()
  for (const stop of routes[no]) {
    busStopRequests[stop].fullfilled = true;
  }

  return json({ success: true });
}
