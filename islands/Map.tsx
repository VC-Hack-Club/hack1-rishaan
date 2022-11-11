import { MapPinIcon } from "@heroicons/solid";
import { useState } from "preact/hooks";
import useZipCode from "../hooks/useZipCode.ts";
import { Candidate } from "../types/shelters.ts";

export default function Map() {
  const zipCode = useZipCode();
  const [userZip, setUserZip] = useState<string | null>();
  const [shelter, setShelter] = useState<Candidate | null>();

  return (
    <div class="flex flex-col gap-y-5 w-full">
      <div class="flex-grow w-full flex gap-x-3">
        <input
          class="flex-grow w-full border rounded shadow px-2"
          type="number"
          placeholder="Your Zip Code"
          value={userZip || zipCode}
          onInput={(e) => setUserZip((e.target as HTMLInputElement).value)}
        >
          {zipCode}
        </input>
        <button
          class="h-10 w-10 bg-white rounded flex items-center justify-center shadow"
          onClick={() => {
            fetch("/api/shelters", {
              method: "POST",
              body: JSON.stringify({ zipCode: userZip || zipCode }),
            }).then(async (res) => {
              if (res.ok) {
                return setShelter(await res.json());
              }
              alert(`Error ${res.statusText}`);
            }).catch((err) => alert(err.message));
          }}
        >
          <MapPinIcon className="h-5 w-5" color="black" />
        </button>
      </div>
      {shelter && (
        <div>
          <div class="text-xl font-semibold">
            Nearest Shelter:
          </div>
          <div>
            {shelter.name} on{" "}
            <a
              class="text-blue-500 underline"
              href={`https://www.google.com/maps/search/${
                shelter.formatted_address.replace(" ", "+")
              }`}
            >
              {shelter.formatted_address}
            </a>
          </div>
          <div>
            Rating: {shelter.rating}
          </div>
          <div>
            Currently Open: {shelter.opening_hours.open_now ? "Yes" : "No"}
          </div>
        </div>
      )}
    </div>
  );
}
