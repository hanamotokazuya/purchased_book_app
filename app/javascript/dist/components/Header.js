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
const styled_components_1 = __importDefault(require("styled-components"));
const axios_1 = __importDefault(require("axios"));
const media_1 = require("../utils/media");
const AppContext_1 = __importDefault(require("../contexts/AppContext"));
const useInterval_1 = __importDefault(require("../utils/useInterval"));
const Hamburger_1 = __importDefault(require("./Hamburger"));
const CreateBook_1 = __importDefault(require("./CreateBook"));
const SearchBar_1 = __importDefault(require("./SearchBar"));
const Base = styled_components_1.default.header `
  position: fixed;
  z-index: 10;
  background-color: #111111;
  width: 100%;
`;
const Wrapper = styled_components_1.default.div `
  margin: 0 auto;
  padding: 10px;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftSide = styled_components_1.default.div `
  display: flex;
  justify-content: left;
  align-items: center;
  ${(0, media_1.pc) `
  height: 72px;
  `}
  ${(0, media_1.tab) `
  height: 56px;
  `}
  ${(0, media_1.sp) `
  height: 56px;
  `}
`;
const Logo = styled_components_1.default.div `
  border-color: #eaeded;
  border-radius: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #eaeded;
  ${(0, media_1.pc) `
    border 4px solid;
    width: 64px;
    height: 64px;
    font-size: 16px;
    font-weight: bold;
  `}
  ${(0, media_1.tab) `
    border 2px solid;
    width: 32px;
    height: 32px;
    font-size: 8px;
  `}
  ${(0, media_1.sp) `
    width: 16px;
    height: 16px;
    font-size: 8px;
  `}
`;
const ResultBookCount = styled_components_1.default.p `
  color: #eaeded;
  font-weight: bold;
  ${(0, media_1.pc) `
    font-size: 48px;
    &::after {
      content: "冊";
      font-size: 16px;
    }
  `}
  ${(0, media_1.tab) `
    font-size: 32px;
    &::after {
      content: "冊";
      font-size: 16px;
    }
  `}
  ${(0, media_1.sp) `
    font-size: 16px;
    &::after {
      content: "冊";
      font-size: 8px;
    }
  `}
`;
const Blank = styled_components_1.default.div `
  margin: 0 auto;
`;
const Links = styled_components_1.default.div `
  display: flex;
  justify-content: right;
  ${(0, media_1.pc) `
    display: block;
  `}
  ${(0, media_1.tab) `
    display: none;
  `}
  ${(0, media_1.sp) `
    display: none;
  `}
`;
const AddBookButton = styled_components_1.default.button `
  color: white;
  font-size: 14px;
  border: none;
  padding: 3px 10px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`;
const UpDownAnime = (0, styled_components_1.default)(react_spring_1.animated.div) `
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;
const Link = (0, styled_components_1.default)(react_router_dom_1.Link) `
  font-size: 14px;
  padding: 3px 10px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`;
function Header() {
    const { state: { showBooks, isSignIn }, dispatch, } = (0, react_1.useContext)(AppContext_1.default);
    const [resultBookCount, setResultBookCount] = (0, react_1.useState)(0);
    const [isOpenAddPage, setIsOpenAddPage] = (0, react_1.useState)(false);
    const spring = (0, react_spring_1.useSpring)({
        opacity: isOpenAddPage ? "1" : "0",
        display: isOpenAddPage ? "block" : "none",
        config: { duration: 250 },
    });
    function countUpDown() {
        resultBookCount < showBooks.length && setResultBookCount(resultBookCount + 1);
        resultBookCount > showBooks.length && setResultBookCount(resultBookCount - 1);
    }
    const signout = () => {
        // sessionとcookiesを掃除する処理を書く
        axios_1.default.delete("/api/v1/sessions/destroy");
        // カレントユーザーのステートを初期化する
        dispatch({ type: "SIGN_OUT_EVENT" });
    };
    (0, useInterval_1.default)(countUpDown, 10);
    return (react_1.default.createElement(Base, null,
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(LeftSide, null,
                react_1.default.createElement(Logo, null,
                    react_1.default.createElement("p", null,
                        "\u66F8\u7C4D",
                        react_1.default.createElement("br", null),
                        "\u7BA1\u7406")),
                isSignIn && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(UpDownAnime, { style: spring },
                        react_1.default.createElement(CreateBook_1.default, { close: () => setIsOpenAddPage(!isOpenAddPage) })),
                    react_1.default.createElement(react_router_dom_1.Routes, null,
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/books", element: react_1.default.createElement(SearchBar_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(react_router_dom_1.Outlet, null) })),
                    react_1.default.createElement(react_router_dom_1.Routes, null,
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/books", element: react_1.default.createElement(ResultBookCount, null, resultBookCount) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(Blank, null) }))))),
            isSignIn && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Links, null,
                    react_1.default.createElement(Link, { to: "/books" }, "\u672C\u3092\u4E26\u3079\u308B"),
                    react_1.default.createElement(Link, { to: "/pie_chart" }, "\u30D1\u30A4\u30C1\u30E3\u30FC\u30C8"),
                    react_1.default.createElement(AddBookButton, { onClick: () => setIsOpenAddPage(!isOpenAddPage) }, "\u672C\u3092\u8FFD\u52A0\u3059\u308B"),
                    react_1.default.createElement(Link, { to: "/signin", onClick: signout }, "\u30B5\u30A4\u30F3\u30A2\u30A6\u30C8")),
                react_1.default.createElement(Hamburger_1.default, { signout: signout, addBook: () => setIsOpenAddPage(!isOpenAddPage) }))))));
}
exports.default = Header;
