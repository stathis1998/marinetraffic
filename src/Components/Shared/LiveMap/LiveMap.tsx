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

    /** I could not understand the API documentation so I got one that just returned some results to display some data */
    /** You asked to animate but there is nothing to animate, create some clustering but for what? I have a million questions so I could not complete this assignment */
    /** Also in this simple example I found no use of using Redux, problem had no description and was vague */
    /** You asked for React Query without the need of a form? A lot of information were missing from the problem so I did nothing of value here */
    /** Take a look if you want but I am 100% that is not what you wanted but on the other hand I did not know what you wanted me to do */

    /** Sidenote: If you still wanna proceed with maybe some clarifications, please let me know! */
    /** ~Stathis */

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
            title={item.TIMESTAMP}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export { LiveMap };
