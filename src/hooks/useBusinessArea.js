import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dropDownData } from "../redux/dropdownSlice";

export default function useBusinessArea() {
  const dispatch = useDispatch();
  const dropdownData = useSelector((state) => state?.dropDown?.data);
  const searchParams = new URLSearchParams(window.location.search);
  const urlBusinessArea = searchParams.get("businessArea");
  const [initialized, setInitialized] = useState(false);
  const [selected, setSelected] = useState("");
 
  // Fetch dropdown data
  useEffect(() => {
    dispatch(dropDownData());
  }, [dispatch]);

  // Dataset creation (merged)
  const dropdownDataset = useMemo(() => {
    if (!dropdownData?.businessAreas) return [];
    const userTypeArray = dropdownData.businessAreas.userType || [];
    const hasGlobalContractOwner = userTypeArray.includes("Global Contract Owner");

    if (hasGlobalContractOwner && Array.isArray(dropdownData.businessAreas.businessAreas)) {
      return dropdownData.businessAreas.businessAreas.map((item) => ({
        businessAreaName: item.businessArea,
        isActive: String(item.isActive),
      }));
    } else if (typeof dropdownData.businessAreas.businessAreas === "object") {
      const allowedKeys = ["ownerOfBusinessAreas","businessArea","businessAreaContribute","businessAreaRead"];
      return Object.keys(dropdownData.businessAreas.businessAreas)
        .filter((key) => allowedKeys.includes(key) && Array.isArray(dropdownData.businessAreas.businessAreas[key]))
        .flatMap((key) =>
          dropdownData.businessAreas.businessAreas[key].map((obj) => ({
            businessAreaName: obj.businessArea,
            isActive: String(obj.isActive),
            sourceKey: key, // keep track of which key the BA came from
          }))
        );
    }
    return [];
  }, [dropdownData]);

  // Extract only businessAreaRead
  const businessAreaReadData = useMemo(() => {
    if (!dropdownData?.businessAreas?.businessAreas?.businessAreaRead) return [];
    return dropdownData.businessAreas.businessAreas.businessAreaRead.map((obj) => ({
      businessAreaName: obj.businessArea,
      isActive: String(obj.isActive),
    }));
  }, [dropdownData]);

  // Active BA
  const activeBA = useMemo(() => {
    const activeItems = dropdownDataset.filter((item) => item.isActive === "true");
    return activeItems.find((item) => item.businessAreaName === "Global-Dashboard") || activeItems[0];
  }, [dropdownDataset]);

  // Initialize selected only once
  useEffect(() => {
    if (!activeBA?.businessAreaName || initialized) return;
    setSelected(urlBusinessArea || activeBA.businessAreaName);
    setInitialized(true);
  }, [activeBA, urlBusinessArea, initialized]);

  // All active business areas
  const businessAreaData = useMemo(
    () => dropdownDataset.filter((item) => item.isActive === "true").map((item) => item.businessAreaName),
    [dropdownDataset]
  );

  return { 
    selected, 
    setSelected, 
    activeBA, 
    businessAreaData, 
    dropdownDataset, 
    businessAreaReadData // 👈 specific read-only dataset
  };
}
