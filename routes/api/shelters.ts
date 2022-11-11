import { Handlers } from "$fresh/server.ts";
import usZips from "us-zips";
import { Shelters } from "../../types/shelters.ts";

interface ShelterRequest {
  zipCode: string;
}

export const handler: Handlers = {
  async POST(req) {
    const { zipCode } = await req
      .json() as unknown as ShelterRequest;

    if (!(zipCode)) {
      return new Response(null, {
        status: 400,
      });
    }

    const coordinates = usZips[zipCode];

    if (!coordinates) {
      return new Response(null, {
        status: 404,
      });
    }

    const { latitude, longitude } = coordinates;

    const requestUri = new URL(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
    );

    requestUri.searchParams.append("input", "homeless shelter");
    requestUri.searchParams.append("inputtype", "textquery");
    requestUri.searchParams.append(
      "key",
      Deno.env.get("GOOGLE_MAPS_API_KEY")!,
    );
    requestUri.searchParams.append(
      "locationbias",
      `point:${latitude},${longitude}`,
    );
    requestUri.searchParams.append(
      "fields",
      `formatted_address,name,opening_hours,rating`,
    );

    return await fetch(requestUri).then(async (res) => {
      if (res.ok) {
        const { candidates }: Shelters = await res.json();
        if (!candidates.length) {
          return new Response(null, {
            status: 404,
          });
        }
        return new Response(JSON.stringify(candidates[0]), {
          status: 200,
        });
      }
      return new Response(null, {
        status: 500,
      });
    }).catch(() => {
      return new Response(null, {
        status: 500,
      });
    });
  },
};
