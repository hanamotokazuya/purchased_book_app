import React, {useState} from "react";
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from "recharts";
import styled from "styled-components";
import {pc, tab, sp} from "../utils/media";

type Props = {
  data: PieChartFormat[];
  colors: string[];
};

function PieChartFig({data, colors}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (index: number) => setActiveIndex(index);
  return (
    <ResponsiveContainer width={"80%"} height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius="60%"
          startAngle={90}
          endAngle={-270}
          animationBegin={200}
          animationDuration={1000}
          fill="#82ca9d"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={(_, index:number) => onPieEnter(index)}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartFig;

const PieText = styled.text`
  ${pc`
    font-size: 14px;
  `}
  ${tab`
    font-size: 12px;
  `}
  ${sp`
    font-size: 10px;
  `}
`;

function renderActiveShape(props: PieActiveShape) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
    name,
  } = props;

  return (
    <g>
      <PieText x={0} y={30}>{`${name}: ${value}冊 (Rate ${(percent * 100).toFixed(2)}%)`}</PieText>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
}
