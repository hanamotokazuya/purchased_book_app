"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AppContext_1 = __importDefault(require("../contexts/AppContext"));
const PieChartLegends_1 = __importDefault(require("./PieChartLegends"));
const PieChartFig_1 = __importDefault(require("./PieChartFig"));
const styled_components_1 = __importDefault(require("styled-components"));
const constants_1 = require("../constants");
const Base = styled_components_1.default.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;
function DisplayPieChart() {
    const { state: { books }, } = (0, react_1.useContext)(AppContext_1.default);
    const dataForPieChart = dataFormatForPieChart(books);
    return (react_1.default.createElement(Base, null,
        react_1.default.createElement(PieChartLegends_1.default, { data: dataForPieChart, colors: constants_1.COLORS }),
        react_1.default.createElement(PieChartFig_1.default, { data: dataForPieChart, colors: constants_1.COLORS })));
}
// 購入書籍のデータをパイチャートで使用できるフォーマットに変換する関数
function dataFormatForPieChart(books) {
    const countMap = new Map();
    // カテゴリー毎の書籍数をカウント
    books.map((book) => {
        const n = countMap.get(book.category);
        if (!(typeof n === "number")) {
            countMap.set(book.category, 1);
        }
        else {
            countMap.set(book.category, n + 1);
        }
    });
    // パイチャートで使用できるフォーマットに変換
    const data = [];
    [...countMap].forEach(([name, value], index) => (data[index] = { index, name, value }));
    // 冊数の多い順でソート
    data.sort((a, b) => b.value - a.value);
    return data;
}
exports.default = DisplayPieChart;
