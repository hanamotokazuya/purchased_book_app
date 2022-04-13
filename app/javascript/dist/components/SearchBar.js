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
const styled_components_1 = __importDefault(require("styled-components"));
const constants_1 = require("../constants");
const SearchForm = styled_components_1.default.form `
  font-size: 12px;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;
const CategorySelect = styled_components_1.default.select `
  margin-right: 10px;
`;
const KeywordInput = styled_components_1.default.input `
  width: 200px;
  margin-bottom: 5px;
`;
const SearchButton = styled_components_1.default.button `
  border-radius: 5px;
  background-color: #eaeded;
  color: #000000;
  font-weight: bold;
  border: none;
`;
const Wrapper = styled_components_1.default.div `
  display: flex;
`;
function SearchBar() {
    const { dispatch } = (0, react_1.useContext)(AppContext_1.default);
    const [searchCategory, setSearchCategory] = (0, react_1.useState)("");
    const [searchKeyword, setSearchKeyword] = (0, react_1.useState)("");
    const handleClickSearchBook = (e) => {
        e.preventDefault();
        return dispatch({ type: "SEARCH_EVENT", searchCategory, searchKeyword });
    };
    return (react_1.default.createElement(SearchForm, null,
        react_1.default.createElement(KeywordInput, { type: "text", placeholder: "\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", onChange: (e) => setSearchKeyword(e.target.value) }),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(CategorySelect, { onChange: (e) => setSearchCategory(e.target.value) },
                react_1.default.createElement("option", null, "\u3059\u3079\u3066"),
                constants_1.CATEGORIES.map((category, key) => (react_1.default.createElement("option", { key: key }, category)))),
            react_1.default.createElement(SearchButton, { onClick: handleClickSearchBook }, "\u691C\u7D22"))));
}
exports.default = SearchBar;
