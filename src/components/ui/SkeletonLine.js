import React from "react";
import "../style/skeleton.css";

const SkeletonLine = ({ height = "20px", width = "80%", borderRadius = "4px" }) => {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius, marginBottom: "6px" }}
    />
  );
};

export default SkeletonLine;
