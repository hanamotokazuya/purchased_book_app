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
const styled_components_1 = __importDefault(require("styled-components"));
const AppContext_1 = __importDefault(require("../contexts/AppContext"));
const axios_1 = __importDefault(require("axios"));
const md_1 = require("react-icons/md");
const media_1 = require("../utils/media");
const BookLists = styled_components_1.default.ul `
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
`;
const BookList = styled_components_1.default.li `
  list-style: none;
  position: relative;
  ${(0, media_1.pc) `
    padding: 0 10px 20px 10px;
    width: 194px;
    height: ${194 * 1.41}px;
  `}
  ${(0, media_1.tab) `
    padding: 0 5px 10px 5px;
    width: 170px;
    height: ${170 * 1.41}px;
  `}
  ${(0, media_1.sp) `
    padding: 0 4px 8px 4px;
    width: 95px;
    height: ${95 * 1.41}px;
  `}
`;
const DeleteIcon = (0, styled_components_1.default)(md_1.MdDeleteForever) `
  cursor: pointer;
  position: absolute;
  ${(0, media_1.pc) `
    top: 10px;
    right: 20px;
  `}
  ${(0, media_1.tab) `
    top: 10px;
    right: 20px;
  `}
  ${(0, media_1.sp) `
    top: 3px;
    right: 7px;
  `}
`;
const BookImage = styled_components_1.default.img `
  width: 100%;
  height: 100%;
`;
function DisplayBook() {
    const { state: { showBooks }, dispatch, } = (0, react_1.useContext)(AppContext_1.default);
    const handleClickBookDelete = (book) => {
        const isDelete = window.confirm(`${book.title}を削除してよろしいですか？`);
        if (isDelete) {
            axios_1.default
                .delete(`/api/v1/books/destroy/${book.id}`)
                .then(() => {
                dispatch({ type: "DELETE_BOOK_EVENT", id: book.id });
            })
                .catch((e) => {
                console.log(e);
            });
        }
    };
    return (react_1.default.createElement(BookLists, null,
        !showBooks.length && react_1.default.createElement("p", null, "\u672C\u304C\u3042\u308A\u307E\u305B\u3093\u3002"),
        showBooks.map((book, key) => (react_1.default.createElement(BookList, { key: key },
            react_1.default.createElement(BookImage, { src: book.url }),
            react_1.default.createElement(DeleteIcon, { onClick: () => handleClickBookDelete(book) }))))));
}
exports.default = DisplayBook;
