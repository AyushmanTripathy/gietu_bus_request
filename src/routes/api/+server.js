import { distanceInKm } from "$lib/utils.js";
import { error, json } from "@sveltejs/kit";
import { config, admins, stopCoords, routes, stopNames } from "$lib/info.js";

const studentRequests = {};
const busStopRequests = {};
for (const name of stopNames)
  busStopRequests[name] = { count: 0, fullfilled: false };

setInterval(() => {
  const time = Date.now();
  for (const email in studentRequests) {
    if (time - studentRequests[email].time > config.maxStudentRequestTime) {
      busStopRequests[studentRequests[email].stop].count--;
      delete studentRequests[email];
    }
  }

  for (const stop of stopNames) {
    if (
      busStopRequests[stop].fullfilled &&
      time - busStopRequests[stop].fullfilled > config.maxBusTime
    ) {
      busStopRequests[stop].fullfilled = false;
    }
  }
}, 60000);

export async function GET({ locals }) {
  const session = await locals.getSession();
  if (!session) {
    throw error(401, "Forbidden");
  }

  return json({
    busStopRequests,
    isAdmin: admins.has(session.user.email),
    currentStop: studentRequests[(session.user.email)] ?? null
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

  busStopRequests[studentRequests[email].stop].count--;
  delete studentRequests[email];

  console.log(email + " cancelled request");
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
      msg: "Already requested for " + studentRequests[email].stop,
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
  if (min > config.maxDistanceForRequest)
    return json({
      success: false,
      msg: "You are not close to any bus stops yet.",
    });

  busStopRequests[best].count++;
  studentRequests[email] = { stop: best, time: Date.now() };

  console.log(email + " requested for " + best);
  return json({ success: true, stopName: best });
}

export async function PATCH({ request, locals }) {
  const session = await locals.getSession();
  if (!session || !admins.has(session.user.email)) {
    throw error(401, "Forbidden");
  }

  const no = await request.json();
  for (const stop of routes[no]) {
    busStopRequests[stop].fullfilled = Date.now();
  }

  console.log("Bus on route " + no);
  return json({ success: true });
}
