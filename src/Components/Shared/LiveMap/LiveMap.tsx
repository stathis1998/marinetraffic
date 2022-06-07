import { useEffect, useMemo, useState, useRef } from "react";
import { ILiveMapProps } from "./types";
import "./style.css";

import axios from "axios";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import { Marker } from "../Marker";

const LiveMap: React.FC<ILiveMapProps> = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY ?? "",
  });

  const athensCords = useMemo(() => ({ lat: 37.98391, lng: 23.727529 }), []);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const period = "daily";
    const days = "3";
    const mmsi = "241486000";

    axios
      .get(
        `https://services.marinetraffic.com/api/exportvesseltrack/${process.env.REACT_APP_MARINE_TRAFFIC_API_KEY}/v:3/period:${period}/days:${days}/mmsi:${mmsi}/protocol:jsono`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading map</div>;

  return (
    <div className="live-map h-[100vh] w-full">
      <GoogleMap
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={athensCords}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      >
        {data.map((item, index) => (
          <Marker
            key={index}
            lat={parseFloat(item.LAT)}
            lng={parseFloat(item.LON)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export { LiveMap };
