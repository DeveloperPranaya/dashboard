
import { useEffect, useRef } from "react";
import Tooltip from "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TooltipWrapper({ title, placement = "top", children , customClass  }) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const tooltip = new Tooltip(tooltipRef.current, {
      title,
      placement,
      trigger: "hover focus",  
      customClass 
    });

    return () => {
      tooltip.dispose(); 
    };
  }, [title, placement, customClass ]);

  return (
    <span ref={tooltipRef} data-bs-toggle="tooltip">
      {children}
    </span>
  );
}
