import { useEffect, useState } from "preact/hooks";
import useGeolocation from "react-hook-geolocation";

export default function useZipCode() {
  const { error, ...position } = useGeolocation();
  const [zipCode, setZipCode] = useState();

  useEffect(() => {
    const { latitude, longitude } = position;
    if (latitude && longitude) {
      fetch("/api/location/zip", {
        method: "POST",
        body: JSON.stringify({ latitude, longitude }),
      }).then(async (res) => {
        if (res.ok) {
          return setZipCode((await res.json()).zipCode);
        }
        alert(`Error ${res.statusText}`);
      }).catch((err) => alert(err.message));
    }
  }, [position]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return zipCode;
}
