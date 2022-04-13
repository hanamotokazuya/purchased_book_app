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
const react_router_dom_1 = require("react-router-dom");
const react_spring_1 = require("react-spring");
const react_icons_1 = require("react-icons");
const gi_1 = require("react-icons/gi");
const styled_components_1 = __importDefault(require("styled-components"));
const media_1 = require("../utils/media");
const Base = styled_components_1.default.div `
  ${(0, media_1.pc) `
    display: none;
  `}
  ${(0, media_1.tab) `
    display: block;
  `}
  ${(0, media_1.sp) `
    display: block;
  `}
`;
const Menu = (0, styled_components_1.default)(gi_1.GiHamburgerMenu) `
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
const MenuItems = (0, styled_components_1.default)(react_spring_1.animated.div) `
  width: 150px;
  font-size: 14px;
  background-color: white;
  position: fixed;
  top: 76px;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  z-index: 1000;
`;
const ItemL = (0, styled_components_1.default)(react_router_dom_1.Link) `
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px;
  padding: 3px 10px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`;
const ItemB = styled_components_1.default.div `
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px;
  padding: 3px 10px;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`;
function Hamburger({ signout, addBook }) {
    const [isOpenHam, SetIsOpenHam] = (0, react_1.useState)(false);
    const MenuSpring = (0, react_spring_1.useSpring)({ right: isOpenHam ? "0" : "-200px" });
    return (react_1.default.createElement(Base, null,
        react_1.default.createElement(react_icons_1.IconContext.Provider, { value: { color: "#eaeded", size: "64px" } },
            react_1.default.createElement(Menu, { onClick: () => SetIsOpenHam(!isOpenHam) }),
            react_1.default.createElement(MenuItems, { style: MenuSpring },
                react_1.default.createElement(ItemL, { to: "/books" }, "\u672C\u3092\u4E26\u3079\u308B"),
                react_1.default.createElement(ItemL, { to: "/pie_chart" }, "\u30D1\u30A4\u30C1\u30E3\u30FC\u30C8"),
                react_1.default.createElement(ItemB, { onClick: addBook }, "\u672C\u3092\u8FFD\u52A0\u3059\u308B"),
                react_1.default.createElement(ItemL, { to: "/signin", onClick: signout }, "\u30B5\u30A4\u30F3\u30A2\u30A6\u30C8")))));
}
exports.default = Hamburger;
