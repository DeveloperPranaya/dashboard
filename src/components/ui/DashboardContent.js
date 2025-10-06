import HeavyWidget from "./HeavyWidget";
import WidgetLoader from "../../pages/dashboard/WidgetLoader";

const CRITICAL_LAYOUTS = ["WG001", "WG003", "WG006"];
const HEAVY_LAYOUTS = [
  "WG013","WG007","WG008","WG009","WG010","WG012","WG014","WG015","WG016","WG017"
];

export default function DashboardContent({ business_area }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "16px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {CRITICAL_LAYOUTS.map((layout) => (
        <div key={layout} className="widget-box">
          <WidgetLoader business_area={business_area} layout={layout} />
        </div>
      ))}

      {HEAVY_LAYOUTS.map((layout) => (
        <HeavyWidget key={layout} business_area={business_area} layout={layout} />
      ))}
    </div>
  );
}
