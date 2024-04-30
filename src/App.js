import * as d3 from "d3";
import './App.css';
import { useEffect } from "react";
import { useRef } from "react";

const data = [12,5,20,35]

function App() {
  //const ref = useRef()

  /* useEffect(()=>{
    const svgElement = d3.select(ref.current)
    svgElement.append("svg")
      .attr("x", 150)
      .attr("y", 200)
      .attr("width", 50)
      .attr("height", 100)
      .attr("fill", "")
  }, []) */

  return (
    <div id="background">
      <svg>
        {data.map((d, i)=>(
          <rect 
            x={i*50}
            y={100-d}
            width="40"
            height={d}
            
          />
        ))}
      </svg>
    </div>
  );
}

export default App;
