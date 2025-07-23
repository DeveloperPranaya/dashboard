// import { useState } from "react";

// function Demo() {
//   const [count, setCount] = useState(0);

//   const data = [
//     { start: "*", review: 1 },
//     { start: "*", review: 2 },
//     { start: "*", review: 3 },
//     { start: "*", review: 4 },
//     { start: "*", review: 5 }
//   ];

//   const handleClick = (id) => {
//     setCount(id);
//   };

//   const renderRatingText = () => {
//     if (count === 1) return <div>Rating 1</div>;
//     else if (count === 2) return <div>Rating 2</div>;
//     else if (count === 3) return <div>Rating 3</div>;
//     else if (count === 4) return <div>Rating 4</div>;
//     else if (count === 5) return <div>Rating 5</div>;
//     else return null;
//   };

//   return (
//     <>
//       <div style={{ display: "flex", gap: "10px" }}>
//         {data.map((item, index) => (
//           <div
//             key={index}
//             style={{ cursor: "pointer", width: "10px" }}
//             onClick={() => handleClick(item.review)}
//           >
//             {item.start}
//           </div>
//         ))}
//       </div>
//       {renderRatingText()}
//     </>
//   );
// }

// export default Demo;

import React,{useState, useEffect} from "react";

function Demo(){

  useEffect(()=>{
   try{ fetch("http://localhost:8000/api/users")
    .then((res)=>console.log(res.data))
   }catch(e){
    console.log("the error is",e)
   }
  })
  return(<>
  
  </>)
}
export default Demo;
