import React from "react";
import styled from "styled-components";
import { pc, tab, sp } from '../utils/media'

const LegendItems = styled.div`
  width: 80%;
  min-width: 280px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
`
const LegendItem = styled.div`
  display: flex;
  align-items:center;
  ${pc`
    margin-bottom: 10px;
  `}
  ${tab`
    margin-bottom: 8x;
  `}
  ${sp`
    margin-bottom: 6px;
  `}
`
const LegendColor = styled.div`
  border-radius: 5px;
  ${pc`
    width: 30px;
    height: 30px;
    margin-right: 6px;
  `}
  ${tab`
    width: 20px;
    height: 20px;
    margin-right: 4px;
  `}
  ${sp`
    width: 10px;
    height: 10px;
    margin-right: 3px;
  `}
`
const LegendName = styled.p`
  ${pc`
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
  `}
  ${tab`
    font-size: 14px;
    margin-right: 6px;
  `}
  ${sp`
    font-size: 12px;
    margin-right: 4px;
  `}
`


function PieChartLegends({ data, colors }) {
  return (
    <LegendItems>
      {data.map((entry, index) => (
        <LegendItem key={index}>
          <LegendColor style={{ backgroundColor: colors[index % colors.length] }} />
          <LegendName>{entry.name}</LegendName>
        </LegendItem>
      ))}
    </LegendItems>
  );
}

export default PieChartLegends;
