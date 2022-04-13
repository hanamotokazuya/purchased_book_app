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
const recharts_1 = require("recharts");
const styled_components_1 = __importDefault(require("styled-components"));
const media_1 = require("../utils/media");
const PieText = styled_components_1.default.text `
  ${(0, media_1.pc) `
    font-size: 14px;
  `}
  ${(0, media_1.tab) `
    font-size: 12px;
  `}
  ${(0, media_1.sp) `
    font-size: 10px;
  `}
`;
function PieChartFig({ data, colors }) {
    const [activeIndex, setActiveIndex] = (0, react_1.useState)(0);
    const onPieEnter = (index) => setActiveIndex(index);
    return (react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "80%", height: 430 },
        react_1.default.createElement(recharts_1.PieChart, null,
            react_1.default.createElement(recharts_1.Pie, { data: data, dataKey: "value", cx: "50%", cy: "50%", outerRadius: "60%", startAngle: 90, endAngle: -270, animationBegin: 200, animationDuration: 1000, fill: "#82ca9d", activeIndex: activeIndex, activeShape: renderActiveShape, onMouseEnter: (_, index) => onPieEnter(index) }, data.map((_, index) => (react_1.default.createElement(recharts_1.Cell, { key: `cell-${index}`, fill: colors[index % colors.length] })))))));
}
exports.default = PieChartFig;
function renderActiveShape(props) {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent, value, name, } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(recharts_1.Sector, { cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle, fill: fill }),
        react_1.default.createElement(recharts_1.Sector, { cx: cx, cy: cy, startAngle: startAngle, endAngle: endAngle, innerRadius: outerRadius + 6, outerRadius: outerRadius + 10, fill: fill }),
        react_1.default.createElement("path", { d: `M${sx},${sy}L${mx},${my}L${ex},${ey}`, stroke: fill, fill: "none" }),
        react_1.default.createElement("circle", { cx: ex, cy: ey, r: 2, fill: fill, stroke: "none" }),
        react_1.default.createElement(PieText, { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, textAnchor: textAnchor, fill: "#333" }, `${name}: ${value}冊`),
        react_1.default.createElement(PieText, { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, dy: 18, textAnchor: textAnchor, fill: "#999" }, `(Rate ${(percent * 100).toFixed(2)}%)`)));
}
