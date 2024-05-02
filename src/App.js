import * as d3 from "d3";
import './App.css';
import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import ResizeObserver from '@juggle/resize-observer'

const Axis = ({ domain=[0, 100], range=[10, 290],}) => {
  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear()
      .domain(domain)
      .range(range)
    const width = range[1] - range[0]
    const pixelsPerTick = 30
    const numberOfTicksTarget = Math.max(
      1,
      Math.floor(
        width / pixelsPerTick
      )
    )
    return xScale.ticks(numberOfTicksTarget)
      .map(value => ({
        value,
        xOffset: xScale(value)
      }))
  }, [domain.join("-"), range.join("-")])
  
  return (
    <svg>
      <path
        d={[
          "M", range[0], 6,
          "v", -6,
          "H", range[1],
          "v", 6,
        ].join(" ")}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
        >
          <line
            y2="6"
            stroke="currentColor"
          />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)"
            }}>
            { value }
          </text>
        </g>
      ))}
    </svg>
  )
}

const combineChartDimensions = dimensions => {
  const parsedDimensions = {
      ...dimensions,
      marginTop: dimensions.marginTop || 10,
      marginRight: dimensions.marginRight || 10,
      marginBottom: dimensions.marginBottom || 40,
      marginLeft: dimensions.marginLeft || 75,
  }
  return {
      ...parsedDimensions,
      boundedHeight: Math.max(
        parsedDimensions.height
        - parsedDimensions.marginTop
        - parsedDimensions.marginBottom,
        0,
      ),
      boundedWidth: Math.max(
        parsedDimensions.width
        - parsedDimensions.marginLeft
        - parsedDimensions.marginRight,
        0,
      ),
  }
}

const useChartDimensions = passedSettings => {
  const ref = useRef()
  const dimensions = combineChartDimensions(
    passedSettings
  )

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
      if (dimensions.width && dimensions.height)
        return [ref, dimensions]

      const element = ref.current
      const resizeObserver = new ResizeObserver(
        entries => {
          if (!Array.isArray(entries)) return
          if (!entries.length) return

          const entry = entries[0]

          if (width != entry.contentRect.width)
            setWidth(entry.contentRect.width)
          if (height != entry.contentRect.height)
            setHeight(entry.contentRect.height)
        }
      )
      resizeObserver.observe(element)

      return () => resizeObserver.unobserve(element)
  }, [])

  const newSettings = combineChartDimensions({
      ...dimensions,
      width: dimensions.width || width,
      height: dimensions.height || height,
  })

  return [ref, newSettings]
}

const chartSettings = {
  "marginLeft": 68
}
const ChartWithDimensions = () => {
  const [ref, dms] = useChartDimensions(chartSettings)

  const xScale = useMemo(() => (
    d3.scaleLinear()
    .domain([0, 100])
    .range([0, dms.boundedWidth])
  ), [dms.boundedWidth])

  return (
    <div
      className="Chart__wrapper"
      ref={ref}
      style={{ height: "200px" }}>
      <svg width={dms.width} height={dms.height}>
        <g transform={`translate(${[
          dms.marginLeft,
          dms.marginTop
        ].join(",")})`}>
          <rect
            width={dms.boundedWidth}
            height={dms.boundedHeight}
            fill="lavender"
          />
          <g transform={`translate(${[
            0,
            dms.boundedHeight,
          ].join(",")})`}>
            <Axis
              domain={xScale.domain()}
              range={xScale.range()}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default ChartWithDimensions;
