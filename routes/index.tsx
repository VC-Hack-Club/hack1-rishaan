import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { MapPinIcon } from "@heroicons/solid";
import Map from "../islands/Map.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>hack1-rishaan</title>
      </Head>
      <div class="p-5 text-black w-full h-screen bg-gray-300">
        <div class="flex flex-col items-center h-full w-full items-center justify-center gap-y-3">
          <div class="text-3xl font-bold">
            Find Nearby Shelters
          </div>
          <Map />
        </div>
      </div>
    </>
  );
}
