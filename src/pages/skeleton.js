// components/ui/skeleton.js
import React from 'react';
import '../style/skeleton.css'; // create animation styles

const Skeleton = ({height = "500px", width = "100%", borderRadius = "8px", count = 3  }) => {
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

export default Skeleton;
