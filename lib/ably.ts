"use client";

import * as Ably from "ably";

let ablyClient: Ably.Realtime | null = null;

export function getAbly() {
  if (ablyClient) {
    return ablyClient;
  }

  ablyClient = new Ably.Realtime({
    authUrl: "/api/ably/token",
  });

  ablyClient.connection.on((state) => {
    console.log("Ably connection state:", state);
  });

  return ablyClient;
}
