import React from "react";
import styled from "styled-components";

const LegendItems = styled.div`
  animation-name: fadeDownLegendAnime;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  opacity: 0;
`
const LegendItem = styled.div`
  display: flex;
  align-items:center;
  margin-bottom: 10px;
`
const LegendColor = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-right: 10px;
`
const LegendName = styled.p`
  font-size: 16px;
  font-weight: bold;
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
