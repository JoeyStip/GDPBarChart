import * as d3 from "d3";
import './App.css';
import { useEffect } from "react";
import { useRef } from "react";

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
    <svg>
      <rect
        x="150"
        y="77"
        width="40"
        height="100"
      />
    </svg>
  );
}

export default App;
