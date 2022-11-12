import { Handlers } from "$fresh/server.ts";
import geo2zip from "geo2zip";

interface LocationRequest {
  latitude: number;
  longitude: number;
}

export const handler: Handlers = {
  async POST(req) {
    const { latitude, longitude } = await req
      .json() as unknown as LocationRequest;
    if (!(latitude && longitude)) {
      return new Response(null, {
        status: 400,
      });
    }

    const zipCodeResults = await geo2zip({ latitude, longitude });
    const zipCode = zipCodeResults?.[0];

    if (!zipCode) {
      return new Response(null, { status: 400 });
    }

    return new Response(JSON.stringify({ zipCode }), { status: 200 });
  },
};
