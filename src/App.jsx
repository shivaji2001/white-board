
import './App.css'
 import { RouterProvider } from 'react-router-dom'
import router from './Router'

function App() {
  return (
     <RouterProvider router={router}/>

    
  )
}

export default App



// import React, { useRef, useState } from 'react';
// import './App.css'; // optional styling

// function App() {
//   const canvasRef = useRef(null);
//   const [selectedShape, setSelectedShape] = useState(null);

//   const handleCanvasClick = (e) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.fillStyle = "#3498db"; // shape color

//     switch (selectedShape) {
//       case "rectangle":
//         ctx.fillRect(x, y, 120, 60);
//         break;
//       case "square":
//         ctx.fillRect(x, y, 60, 60);
//         break;
//       case "circle":
//         ctx.beginPath();
//         ctx.arc(x, y, 30, 0, 2 * Math.PI);
//         ctx.fill();
//         break;
//       case "triangle":
//         ctx.beginPath();
//         ctx.moveTo(x, y);
//         ctx.lineTo(x + 50, y + 100);
//         ctx.lineTo(x - 50, y + 100);
//         ctx.closePath();
//         ctx.fill();
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
//       <h2>React Paint App</h2>

//       <div style={{ marginBottom: '10px' }}>
//         <button onClick={() => setSelectedShape("rectangle")}>Rectangle</button>
//         <button onClick={() => setSelectedShape("square")}>Square</button>
//         <button onClick={() => setSelectedShape("circle")}>Circle</button>
//         <button onClick={() => setSelectedShape("triangle")}>Triangle</button>
//         <button onClick={() => {
//           const ctx = canvasRef.current.getContext("2d");
//           ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//         }}>Clear</button>
//       </div>

//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={500}
//         style={{ border: "2px solid #000", cursor: "crosshair" }}
//         onClick={handleCanvasClick}
//       />
//     </div>
//   );
// }

// export default App;
