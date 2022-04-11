import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import PieChartLegends from "./PieChartLegends";
import PieChartFig from "./PieChartFig";
import styled from "styled-components";

const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:left;
  align-items: center;
`

function DisplayPieChart() {
  const {
    state: { books },
  } = useContext(AppContext);
  const dataForPieChart = dataFormatForPieChart(books);
  const COLORS = ["#adff2f", "#00bfff", "#ffa500", "#ee82ee", "#ffff00", "#9932cc", "#4b0082"];

  return (
    <Base>
      <PieChartLegends data={dataForPieChart} colors={COLORS} />
      <PieChartFig data={dataForPieChart} colors={COLORS} />
    </Base>
  );
}
// 購入書籍のデータをパイチャートで使用できるフォーマットに変換する関数
function dataFormatForPieChart(books) {
  const countMap = new Map();
  // カテゴリー毎の書籍数をカウント
  books.map((book) => {
    if (!countMap.has(book.category)) {
      countMap.set(book.category, 1);
    } else {
      countMap.set(book.category, countMap.get(book.category) + 1);
    }
  });
  // パイチャートで使用できるフォーマットに変換
  const data = [];
  [...countMap].forEach(([name, value], index) => (data[index] = { index, name, value }));
  // 冊数の多い順でソート
  data.sort((a, b) => b.value - a.value);
  return data;
}

export default DisplayPieChart;

