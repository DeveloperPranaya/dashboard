import { useEffect, useState } from "react";
import WidgetLoader from "../../pages/dashboard/WidgetLoader";
import { Skeleton } from "../../pages/skeleton";

export default function HeavyWidget({ business_area, layout }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="widget-box">
      {loaded ? (
        <WidgetLoader business_area={business_area} layout={layout} />
      ) : (
        <Skeleton height="200px" width="100%" />
      )}
    </div>
  );
}
