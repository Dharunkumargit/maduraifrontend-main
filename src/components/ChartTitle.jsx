
import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi';
import {
    
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
  } from "recharts";

const ChartTitle = ({
    title,
    data = [],
    colors = [],}) => {

        const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Zone");

  const options = ["Month", "Quarter", "Year"];
  return (
    <div>
        <div className="bg-lightest-blue p-5 border-3 border-white rounded-xl h-80">
      <div className="flex justify-between items-center ">
        <h3 className="font-semibold">{title}</h3>

        
        <div className="relative w-33 text-sm">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full h-9 flex justify-between items-center pl-3 shadow-sm rounded-md bg-white  text-gray-600"
          >
            {selected}
            <span className=" flex items-center justify-center rounded-r-md bg-[#D0D6FF] w-9 h-9">
              <HiChevronDown
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                size={18}
              />
            </span>
          </button>
          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-[#cdd3ff] rounded-md shadow text-gray-700">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 hover:bg-[#eef0ff] cursor-pointer ${
                    option === selected ? "font-semibold text-[#4c52ff]" : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className=" w-full pt-1 ">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis hide />
          <Tooltip />

          <Bar
            dataKey="value"
            shape={(props) => {
              const { x, y, width, height, index } = props;
              const { fill, stroke } = colors[index % 3];
              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={fill}
                    rx={2}
                  />
                  <line
                    x1={x}
                    x2={x + width}
                    y1={y}
                    y2={y}
                    stroke={stroke}
                    strokeWidth={2}
                  />
                </g>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
      </div>
    </div>
  )
}

export default ChartTitle