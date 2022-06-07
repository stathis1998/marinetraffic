import { IDashboardProps } from "./types";
import "./style.css";

import { LiveMap } from "../../Shared";

const Dashboard: React.FC<IDashboardProps> = (props) => {
  return (
    <div className="dashboard">
      <LiveMap />
    </div>
  );
};

export { Dashboard };
