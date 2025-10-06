// WidgetLoader.js
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchWidgetData } from "../../redux/fetchWidgetDataSlice";


function WidgetLoader({ business_area, layout }) {
  const dispatch = useDispatch();
  const loadedLayouts = useRef(new Set());

 useEffect(() => {
    if (business_area && layout && !loadedLayouts.current.has(layout)) {
      dispatch(fetchWidgetData({ business_area, layout }));
      loadedLayouts.current.add(layout); // ✅ prevents re-fetch
    }
  }, [business_area, layout, dispatch]);

  return null;
}

export default WidgetLoader;
