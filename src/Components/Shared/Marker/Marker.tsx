import { IMarkerProps } from "./types";
import "./style.css";

import cargoMarker from "../../../assets/pngs/ship-marker-32.png";

import { Marker as GMarker } from "@react-google-maps/api";

const Marker: React.FC<IMarkerProps> = (props) => {
  const { lat, lng } = props;

  return (
    <div className="marker">
      <GMarker position={{ lat, lng }} icon={cargoMarker} />
    </div>
  );
};

export { Marker };
