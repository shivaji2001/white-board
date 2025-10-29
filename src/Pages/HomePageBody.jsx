import React, { useRef, useEffect, useState } from "react";
import Pencil from "../../public/images/pencil.png"; // Fixed to pencil image
import Pen from "../../public/images/pen.png";
import Eraser from "../../public/images/eraser.png";
import Square from '../../public/images/square.png';
import Circle from '../../public/images/circle.png';
import Rectangle from '../../public/images/rectangle.png';
import WhiteBoard from "./WhiteBoardArea";
import Triangle from '../../public/images/triangle.png';
import Undo from '../../public/images/undo.png';
import Redo from '../../public/images/redo.png';
import Dropdown from "../Components/DropDown";

const HomePageBody = () => {
   
  const [lineWidth, setLineWidth] = useState(3);
  const [color, setColor] = useState("#000000");
//   const [tool, setTool] = useState('pen');
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [selectedShape, setSelectedShape] = useState('pen');
  
  const SetBrushWidthFn=(value)=>{
      setLineWidth(value)
  }
  const whiteboardRef = useRef(null);
  
  return (
    <div className="homeBody" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div id="pen-picker" style={{ textAlign: "center", padding: "10px", background: "#eee" }}>
        <button id="pen-btn" aria-label="Pen tool" style={{ margin: "0 5px" }} onClick={()=>{ setSelectedShape('pen')}}>
          <img src={Pen} alt="Pen" width={24} height={24} />
        </button>
        <button id="pencil-btn" aria-label="Pencil tool" style={{ margin: "0 5px" }} onClick={()=>{ setSelectedShape('pencil')}} >
          <img src={Pencil} alt="Pencil" width={24} height={24} />
        </button>
        <button id="eraser-btn" aria-label="Eraser tool" style={{ margin: "0 5px" }}  onClick={()=>{setSelectedShape('eraser');setColor('#FFFFFF');}}>
          <img src={Eraser} alt="Eraser" width={24} height={24} />
        </button>
        <button id="color-picker-btn" aria-label="Color picker" style={{ margin: "0 5px" }}  >
            <input type="color" value={color} onChange={(e)=>{setColor(e.target.value); }}/>
        </button>
         <button  style={{ margin: "0 5px" }} onClick={()=>{setSelectedShape('square')}} >
          <img src={Square} alt="Square" width={24} height={24} />
        </button>
         <button  style={{ margin: "0 5px" }} onClick={()=>{setSelectedShape('rectangle')}} >
          <img src={Rectangle} alt="Rectangle" width={24} height={24} />
        </button>
        <button  style={{ margin: "0 5px" }} onClick={()=>{setSelectedShape('triangle')}} >
          <img src={Triangle} alt="Triangle" width={24} height={24} />
        </button>
        <button  style={{ margin: "0 5px" }} onClick={()=>{setSelectedShape('circle')}} >
          <img src={Circle} alt="Circle" width={24} height={24} />
        </button>
         <button  style={{ margin: "0 5px" }}  >
          <input type="number" value={lineWidth} onChange={(e)=>{setLineWidth(e.target.value)}}/>
        </button>
         <button  style={{ margin: "0 5px" }} onClick={() => setSelectedShape("text")}  >
          Add Text
        </button>
        <button  style={{ margin: "0 5px" }} onClick={() => whiteboardRef.current.undo()} >
           <img src={Undo} alt="Triangle" width={24} height={24} />
        </button>
        <button  style={{ margin: "0 5px" }} onClick={() => whiteboardRef.current.redo()} >
           <img src={Redo} alt="Triangle" width={24} height={24} />
        </button>
       

      </div>
      <WhiteBoard lineWidth={lineWidth}  setColor={setColor} color={color} selectedShape={selectedShape} ref={whiteboardRef}/>
     
    </div>
  );
};

export default HomePageBody;
