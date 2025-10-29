// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useRef } from "react";
// const WhiteBoard=({lineWidth,color,setColor})=>{
//       const canvasRef = useRef(null);
//       const ctxRef = useRef(null);
//       const [isDrawing, setIsDrawing] = useState(false);
//       useEffect(() => {
//         const canvas = canvasRef.current;
//         const resizeCanvas = () => {
//           canvas.width = window.innerWidth;
//           canvas.height = window.innerHeight;

//           const ctx = canvas.getContext("2d");
//           ctx.lineCap = "round";
//           ctx.lineJoin = "round";
//           ctx.strokeStyle = color;
//           ctx.lineWidth = lineWidth;

//           ctxRef.current = ctx;
//         };

//         resizeCanvas();

//         window.addEventListener("resize", resizeCanvas);

//         return () => window.removeEventListener("resize", resizeCanvas);
//       }, []);

//       useEffect(() => {
//         if (ctxRef.current) {
//           ctxRef.current.strokeStyle = color;
//           ctxRef.current.lineWidth = lineWidth;
//         }
//       }, [color, lineWidth]);

//        const startDrawing = ({ nativeEvent }) => {
//           const { offsetX, offsetY } = nativeEvent;
//           ctxRef.current.beginPath();
//           ctxRef.current.moveTo(offsetX, offsetY);
//           setIsDrawing(true);
//         };

//         const draw = ({ nativeEvent }) => {
//           if (!isDrawing) return;
//           const { offsetX, offsetY } = nativeEvent;
//           ctxRef.current.lineTo(offsetX, offsetY);
//           ctxRef.current.stroke();
//         };

//         const stopDrawing = () => {
//           if (!isDrawing) return;
//           ctxRef.current.closePath();
//           setIsDrawing(false);
//         };
//        return (
//        <canvas
//           ref={canvasRef}
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing}
//           style={{ flexGrow: 1, display: "block", cursor: "crosshair" }}
//         />
//    )
// }
// export default WhiteBoard;

// import React, { useState, useEffect, useRef } from "react";

// const WhiteBoard = ({ lineWidth, color, setColor, selectedShape }) => {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       const ctx = canvas.getContext("2d");
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.strokeStyle = color;
//       ctx.lineWidth = lineWidth;

//       ctxRef.current = ctx;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     return () => window.removeEventListener("resize", resizeCanvas);
//   }, []);

//   useEffect(() => {
//     if (ctxRef.current) {
//       ctxRef.current.strokeStyle = color;
//       ctxRef.current.lineWidth = lineWidth;
//     }
//   }, [color, lineWidth]);

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;

//     if (selectedShape === "pen") {
//       ctxRef.current.beginPath();
//       ctxRef.current.moveTo(offsetX, offsetY);
//       setIsDrawing(true);
//     } else {
//       setStartPos({ x: offsetX, y: offsetY });
//       setIsDrawing(true); // needed to track drag
//     }
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) return;
//     if (selectedShape !== "pen") return;

//     const { offsetX, offsetY } = nativeEvent;
//     ctxRef.current.lineTo(offsetX, offsetY);
//     ctxRef.current.stroke();
//   };

//   const stopDrawing = ({ nativeEvent }) => {
//     if (!isDrawing) return;

//     setIsDrawing(false);
//     const { offsetX, offsetY } = nativeEvent;
//     const ctx = ctxRef.current;
//     const x0 = startPos.x;
//     const y0 = startPos.y;
//     const x1 = offsetX;
//     const y1 = offsetY;

//     if (selectedShape === "pen") {
//       ctx.closePath();
//       return;
//     }

//     const width = x1 - x0;
//     const height = y1 - y0;

//     ctx.strokeStyle = color;
//     ctx.fillStyle = color;

//     switch (selectedShape) {
//       case "rectangle":
//         ctx.strokeRect(x0, y0, width, height);
//         break;
//       case "square":
//         const side = Math.min(Math.abs(width), Math.abs(height));
//         ctx.strokeRect(x0, y0, width < 0 ? -side : side, height < 0 ? -side : side);
//         break;
//       case "circle":
//         const radius = Math.sqrt(width * width + height * height);
//         ctx.beginPath();
//         ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
//         ctx.stroke();
//         break;
//       case "triangle":
//         ctx.beginPath();
//         ctx.moveTo(x0, y0);
//         ctx.lineTo(x1, y1);
//         ctx.lineTo(x0 - (x1 - x0), y1);
//         ctx.closePath();
//         ctx.stroke();
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <canvas
//       ref={canvasRef}
//       onMouseDown={startDrawing}
//       onMouseMove={draw}
//       onMouseUp={stopDrawing}
//       onMouseLeave={() => setIsDrawing(false)}
//       style={{ flexGrow: 1, display: "block", cursor: "crosshair" }}
//     />
//   );
// };

// export default WhiteBoard;

// import React, { useState, useEffect, useRef } from "react";

// const WhiteBoard = ({ lineWidth, color, selectedShape }) => {
//   const canvasRef = useRef(null);        // Main drawing canvas
//   const previewRef = useRef(null);       // Overlay for live shape preview
//   const mainCtxRef = useRef(null);
//   const previewCtxRef = useRef(null);

//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });

//   // 🧠 Canvas init and resize
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const preview = previewRef.current;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       preview.width = window.innerWidth;
//       preview.height = window.innerHeight;

//       const mainCtx = canvas.getContext("2d");
//       const previewCtx = preview.getContext("2d");

//       mainCtx.lineCap = "round";
//       mainCtx.lineJoin = "round";

//       previewCtx.lineCap = "round";
//       previewCtx.lineJoin = "round";

//       mainCtxRef.current = mainCtx;
//       previewCtxRef.current = previewCtx;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     return () => window.removeEventListener("resize", resizeCanvas);
//   }, []);

//   // 🧠 Update line width & color live
//   useEffect(() => {
//     const effectiveColor = selectedShape === "eraser" ? "#FFFFFF" : color;

//     if (mainCtxRef.current && previewCtxRef.current) {
//       mainCtxRef.current.strokeStyle = effectiveColor;
//       mainCtxRef.current.lineWidth = lineWidth;

//       previewCtxRef.current.strokeStyle = effectiveColor;
//       previewCtxRef.current.lineWidth = lineWidth;
//     }
//   }, [color, lineWidth, selectedShape]);

//   // 🖱 Start drawing
//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     setStartPos({ x: offsetX, y: offsetY });
//     setIsDrawing(true);

//     const ctx = mainCtxRef.current;

//     if (selectedShape === "pen" || selectedShape === "pencil" || selectedShape === "eraser") {
//       ctx.beginPath();
//       ctx.moveTo(offsetX, offsetY);
//     }
//   };

//   // 🖌 Live draw or preview shape
//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) return;

//     const { offsetX, offsetY } = nativeEvent;

//     if (["pen", "pencil", "eraser"].includes(selectedShape)) {
//       const ctx = mainCtxRef.current;
//       ctx.lineTo(offsetX, offsetY);
//       ctx.stroke();
//     } else {
//       const ctx = previewCtxRef.current;
//       ctx.clearRect(0, 0, previewRef.current.width, previewRef.current.height);
//       drawPreviewShape(ctx, selectedShape, startPos.x, startPos.y, offsetX, offsetY);
//     }
//   };

//   // 🛑 Stop drawing
//   const stopDrawing = ({ nativeEvent }) => {
//     if (!isDrawing) return;
//     setIsDrawing(false);

//     const { offsetX, offsetY } = nativeEvent;
//     const ctx = mainCtxRef.current;

//     if (["pen", "pencil", "eraser"].includes(selectedShape)) {
//       ctx.closePath();
//     } else {
//       drawPreviewShape(ctx, selectedShape, startPos.x, startPos.y, offsetX, offsetY);
//       previewCtxRef.current.clearRect(0, 0, previewRef.current.width, previewRef.current.height);
//     }
//   };

//   // 📐 Shape drawer
//   const drawPreviewShape = (ctx, shape, x0, y0, x1, y1) => {
//     const width = x1 - x0;
//     const height = y1 - y0;

//     ctx.beginPath();
//     switch (shape) {
//       case "rectangle":
//         ctx.strokeRect(x0, y0, width, height);
//         break;
//       case "square": {
//         const side = Math.min(Math.abs(width), Math.abs(height));
//         ctx.strokeRect(
//           x0,
//           y0,
//           width < 0 ? -side : side,
//           height < 0 ? -side : side
//         );
//         break;
//       }
//       case "circle": {
//         const radius = Math.sqrt(width * width + height * height);
//         ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
//         break;
//       }
//       case "triangle":
//         ctx.moveTo(x0, y0);
//         ctx.lineTo(x1, y1);
//         ctx.lineTo(x0 - (x1 - x0), y1);
//         ctx.closePath();
//         break;
//       default:
//         break;
//     }
//     ctx.stroke();
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <canvas
//         ref={canvasRef}
//         style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
//       />
//       <canvas
//         ref={previewRef}
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={() => setIsDrawing(false)}
//         style={{ position: "absolute", top: 0, left: 0, zIndex: 1, cursor: "crosshair" }}
//       />
//     </div>
//   );
// };

// export default WhiteBoard;

import React, { useState, useEffect, useRef } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

// const WhiteBoard = ({ lineWidth, color, selectedShape }) => {

const WhiteBoard = forwardRef(({ lineWidth, color, selectedShape }, ref) => {
  useImperativeHandle(ref, () => ({
    undo,
    redo
  }));


  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const mainCtxRef = useRef(null);
  const previewCtxRef = useRef(null);
   const undoStack = useRef([]);
  const redoStack = useRef([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // For text input
  const [textInput, setTextInput] = useState("");
  const [textPosition, setTextPosition] = useState(null);

  const saveState = () => {
    const canvas = canvasRef.current;
    undoStack.current.push(canvas.toDataURL());
    redoStack.current = []; // Clear redo when new action is made
  };
  const undo = () => {
        if (undoStack.current.length === 0) return;
    
        const canvas = canvasRef.current;
        const ctx = mainCtxRef.current;
        const lastState = undoStack.current.pop();
        redoStack.current.push(canvas.toDataURL()); // Save current before undoing
    
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      };
    
      const redo = () => {
        if (redoStack.current.length === 0) return;
    
        const canvas = canvasRef.current;
        const ctx = mainCtxRef.current;
        const nextState = redoStack.current.pop();
        undoStack.current.push(canvas.toDataURL());
    
        const img = new Image();
        img.src = nextState;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      };
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const preview = previewRef.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      preview.width = window.innerWidth;
      preview.height = window.innerHeight;

      const mainCtx = canvas.getContext("2d");
      const previewCtx = preview.getContext("2d");

      mainCtx.lineCap = "round";
      mainCtx.lineJoin = "round";

      previewCtx.lineCap = "round";
      previewCtx.lineJoin = "round";

      mainCtxRef.current = mainCtx;
      previewCtxRef.current = previewCtx;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const effectiveColor = selectedShape === "eraser" ? "#FFFFFF" : color;

    if (mainCtxRef.current && previewCtxRef.current) {
      mainCtxRef.current.strokeStyle = effectiveColor;
      mainCtxRef.current.fillStyle = effectiveColor;
      mainCtxRef.current.lineWidth = lineWidth;

      previewCtxRef.current.strokeStyle = effectiveColor;
      previewCtxRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth, selectedShape]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setStartPos({ x: offsetX, y: offsetY });

    if (selectedShape === "text") {
      setTextPosition({ x: offsetX, y: offsetY });
      setTextInput("");
      return;
    }

    setIsDrawing(true);

    if (["pen", "pencil", "eraser"].includes(selectedShape)) {
      const ctx = mainCtxRef.current;
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    if (["pen", "pencil", "eraser"].includes(selectedShape)) {
      const ctx = mainCtxRef.current;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    } else {
      const ctx = previewCtxRef.current;
      ctx.clearRect(0, 0, previewRef.current.width, previewRef.current.height);
      drawPreviewShape(
        ctx,
        selectedShape,
        startPos.x,
        startPos.y,
        offsetX,
        offsetY
      );
    }
  };

  const stopDrawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const { offsetX, offsetY } = nativeEvent;
    const ctx = mainCtxRef.current;

    if (["pen", "pencil", "eraser"].includes(selectedShape)) {
      ctx.closePath();
    } else {
      drawPreviewShape(
        ctx,
        selectedShape,
        startPos.x,
        startPos.y,
        offsetX,
        offsetY
      );
      previewCtxRef.current.clearRect(
        0,
        0,
        previewRef.current.width,
        previewRef.current.height
      );
    }
    saveState(); 
  };

  const drawPreviewShape = (ctx, shape, x0, y0, x1, y1) => {
    const width = x1 - x0;
    const height = y1 - y0;

    ctx.beginPath();
    switch (shape) {
      case "rectangle":
        ctx.strokeRect(x0, y0, width, height);
        break;
      case "square": {
        const side = Math.min(Math.abs(width), Math.abs(height));
        ctx.strokeRect(
          x0,
          y0,
          width < 0 ? -side : side,
          height < 0 ? -side : side
        );
        break;
      }
      case "circle": {
        const radius = Math.sqrt(width * width + height * height);
        ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
        break;
      }
      case "triangle":
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x0 - (x1 - x0), y1);
        ctx.closePath();
        break;
      default:
        break;
    }
    ctx.stroke();
  };

  const handleTextSubmit = () => {
    if (!textInput.trim() || !textPosition) return;

    const ctx = mainCtxRef.current;
    ctx.fillStyle = color;
    ctx.font = `${lineWidth * 5}px sans-serif`;
    ctx.fillText(textInput, textPosition.x, textPosition.y);

    setTextInput("");
    setTextPosition(null);
    saveState(); 
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />
      <canvas
        ref={previewRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={() => setIsDrawing(false)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          cursor: selectedShape === "text" ? "text" : "crosshair",
        }}
      />

      {/* Text input overlay */}
      {textPosition && selectedShape === "text" && (
        <input
          type="text"
          value={textInput}
          autoFocus
          onChange={(e) => setTextInput(e.target.value)}
          onBlur={handleTextSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTextSubmit();
            }
          }}
          style={{
            position: "absolute",
            top: textPosition.y,
            left: textPosition.x,
            fontSize: `${lineWidth * 5}px`,
            border: "1px solid #ccc",
            padding: "2px",
            background: "white",
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
});

export default WhiteBoard;
