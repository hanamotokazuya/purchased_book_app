import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import PieChartLegends from "./PieChartLegends";
import PieChartFig from "./PieChartFig";
import styled from "styled-components";
import { COLORS } from "../constants";


function DisplayPieChart() {
  const {
    state: { books },
  } = useContext(AppContext);
  const dataForPieChart = dataFormatForPieChart(books);

  return (
    <Base>
      <PieChartLegends data={dataForPieChart} colors={COLORS} />
      <PieChartFig data={dataForPieChart} colors={COLORS} />
    </Base>
  );
}

export default DisplayPieChart;

const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;
// 購入書籍のデータをパイチャートで使用できるフォーマットに変換する関数
function dataFormatForPieChart(books: Book[]): PieChartFormat[] {
  const countMap: Map<string, number> = new Map();
  // カテゴリー毎の書籍数をカウント
  books.map((book) => {
    const n = countMap.get(book.category);
    if (!(typeof n === "number")) {
      countMap.set(book.category, 1);
    } else {
      countMap.set(book.category, n + 1);
    }
  });
  // パイチャートで使用できるフォーマットに変換
  const data: PieChartFormat[] = [];
  Array.from(countMap).forEach(([name, value], index) => (data[index] = { index, name, value }));
  // 冊数の多い順でソート
  data.sort((a, b) => b.value - a.value);
  return data;
}

