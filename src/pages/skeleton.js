// components/ui/skeleton.js
import React from 'react';
import '../style/skeleton.css'; // create animation styles

export const Skeleton = ({height = "500px", width = "100%", borderRadius = "8px", count = 3  }) => {
  return <>
  <div className="skeleton" style={{ height:"50px", width, borderRadius }} />
  
   <div style={{display:"flex", gap:"16px"}}>
  {Array.from({ length: count }).map((_, i) => (
   
        <div
          key={i}
          className="skeleton"
          style={{ height:"200px", width:"50%", borderRadius, marginBottom: "12px" }}
        />
        
      ))}
      </div>
       <div style={{display:"flex", gap:"16px"}}>
  {Array.from({ length: 2 }).map((_, i) => (
   
        <div
          key={i}
          className="skeleton"
          style={{ height:"400px", width:"50%", borderRadius, marginBottom: "12px" }}
        />
        
      ))}
      </div>
  </>
};

export const NotesSkeleton = ({
  height = "20px",
  width = "100%",
  borderRadius = "8px",
  count = 3,   // number of skeleton lines
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="notesskeleton"
          style={{ height, width, borderRadius, marginBottom: "10px" }}
        />
      ))}
    </>
  );
};


export const GraphSkliton = () =>{
 return  <div className="graph-skeleton"></div>
}

export const SkeletonLine = ({ height = "20px", width = "80%", borderRadius = "4px" }) => {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius, marginBottom: "6px" }}
    />
  );
};


