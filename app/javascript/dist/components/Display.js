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
const DisplayBook_1 = __importDefault(require("./DisplayBook"));
const DisplayPieChart_1 = __importDefault(require("./DisplayPieChart"));
const styled_components_1 = __importDefault(require("styled-components"));
const Signup_1 = __importDefault(require("./Signup"));
const Signin_1 = __importDefault(require("./Signin"));
const AppContext_1 = __importDefault(require("../contexts/AppContext"));
const media_1 = require("../utils/media");
const Base = styled_components_1.default.div `
  background-color: #33b913;
  padding-top: 10px;
  padding-bottom: 10px;
  ${(0, media_1.pc) `
    transform: translateY(92px);
  `}
  ${(0, media_1.tab) `
    transform: translateY(76px);
  `}
  ${(0, media_1.sp) `
    transform: translateY(76px);
  `}
`;
const Wrapper = styled_components_1.default.div `
  width: 95%;
  margin: 0 auto;
  max-width: 1024px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #eaeded;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
function Display() {
    const { state: { currentUser: { name: user }, }, } = (0, react_1.useContext)(AppContext_1.default);
    return (react_1.default.createElement(Base, null,
        react_1.default.createElement(Wrapper, null, !!user ? (react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/books", element: react_1.default.createElement(DisplayBook_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/signup", element: react_1.default.createElement(Signup_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/pie_chart", element: react_1.default.createElement(DisplayPieChart_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(react_router_dom_1.Outlet, null) }))) : (react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/signin", element: react_1.default.createElement(Signin_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/signup", element: react_1.default.createElement(Signup_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(react_router_dom_1.Outlet, null) }))))));
}
exports.default = Display;
