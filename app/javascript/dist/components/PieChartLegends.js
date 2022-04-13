"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const media_1 = require("../utils/media");
const LegendItems = styled_components_1.default.div `
  width: 80%;
  min-width: 280px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
`;
const LegendItem = styled_components_1.default.div `
  display: flex;
  align-items: center;
  ${(0, media_1.pc) `
    margin-bottom: 10px;
  `}
  ${(0, media_1.tab) `
    margin-bottom: 8x;
  `}
  ${(0, media_1.sp) `
    margin-bottom: 6px;
  `}
`;
const LegendColor = styled_components_1.default.div `
  border-radius: 5px;
  ${(0, media_1.pc) `
    width: 30px;
    height: 30px;
    margin-right: 6px;
  `}
  ${(0, media_1.tab) `
    width: 20px;
    height: 20px;
    margin-right: 4px;
  `}
  ${(0, media_1.sp) `
    width: 10px;
    height: 10px;
    margin-right: 3px;
  `}
`;
const LegendName = styled_components_1.default.p `
  ${(0, media_1.pc) `
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
  `}
  ${(0, media_1.tab) `
    font-size: 14px;
    margin-right: 6px;
  `}
  ${(0, media_1.sp) `
    font-size: 12px;
    margin-right: 4px;
  `}
`;
function PieChartLegends({ data, colors }) {
    return (react_1.default.createElement(LegendItems, null, data.map((entry, index) => (react_1.default.createElement(LegendItem, { key: index },
        react_1.default.createElement(LegendColor, { style: { backgroundColor: colors[index % colors.length] } }),
        react_1.default.createElement(LegendName, null, entry.name))))));
}
exports.default = PieChartLegends;
