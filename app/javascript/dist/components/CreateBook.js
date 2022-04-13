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
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
const constants_1 = require("../constants");
const react_router_dom_1 = require("react-router-dom");
const cg_1 = require("react-icons/cg");
const Base = styled_components_1.default.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Wrapper = styled_components_1.default.div `
  width: 280px;
  height: 200px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Icon = styled_components_1.default.div `
  width: 250px;
  display: flex;
  justify-content: right;
  margin-bottom: 5px;
`;
const CreateBookForm = styled_components_1.default.form `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CategorySelect = styled_components_1.default.select `
  font-size: 14px;
  width: 250px;
  height: 30px;
  margin-bottom: 10px;
`;
const TitleInput = styled_components_1.default.input `
  font-size: 14px;
  width: 250px;
  height: 30px;
  margin-bottom: 10px;
`;
const FileField = styled_components_1.default.input `
  font-size: 14px;
  width: 250px;
  height: 30px;
  margin-bottom: 10px;
`;
const SubmitButton = styled_components_1.default.button `
  font-size: 14px;
  width: 250px;
  height: 30px;
  border-radius: 5px;
  background-color: white;
  color: #000000;
`;
const ErrorMessageBox = styled_components_1.default.div `
  width: 300px;
  padding: 10px;
  margin-top: 10px;
  color: red;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;
const ErrorMessage = styled_components_1.default.p `
  font-size: 14px;
`;
function CreateBook({ close }) {
    const { dispatch } = (0, react_1.useContext)(AppContext_1.default);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [title, setTitle] = (0, react_1.useState)("");
    const [category, setCategory] = (0, react_1.useState)("");
    const [image, setImage] = (0, react_1.useState)();
    const [errors, setErrors] = (0, react_1.useState)([]);
    const getImage = (e) => {
        const reader = new FileReader();
        const files = e.target.files;
        if (files) {
            reader.onload = () => {
                setImage({
                    data: reader.result,
                    name: Math.random().toString(36).slice(-8),
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };
    const handleClickSubmitBook = (e) => {
        e.preventDefault();
        const data = { title, category, image };
        axios_1.default
            .post("/api/v1/books/create", { book: data })
            .then((res) => {
            const { data } = res;
            if (!Array.isArray(data)) {
                console.log(res.data);
                dispatch({
                    type: "CREATE_BOOK_EVENT",
                    book: data,
                });
                react_toastify_1.toast.success("新しく本が追加されました！");
                setTitle("");
                setCategory("");
                setImage({ data: "", name: "" });
                navigate("/books");
            }
            else {
                setErrors(data);
            }
        })
            .catch((e) => {
            console.log(e);
        });
    };
    return (react_1.default.createElement(Base, null,
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(Icon, null,
                react_1.default.createElement(cg_1.CgClose, { style: { cursor: "pointer" }, onClick: close })),
            react_1.default.createElement(CreateBookForm, null,
                react_1.default.createElement(TitleInput, { type: "text", value: title, placeholder: "\u672C\u306E\u30BF\u30A4\u30C8\u30EB\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", onChange: (e) => setTitle(e.target.value) }),
                react_1.default.createElement(CategorySelect, { value: category, onChange: (e) => setCategory(e.target.value) },
                    react_1.default.createElement("option", { hidden: true }, "\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"),
                    constants_1.CATEGORIES.map((category, key) => (react_1.default.createElement("option", { key: key }, category)))),
                react_1.default.createElement(FileField, { type: "file", accept: "image/*,.png,.jpg,.jpeg,.gif", onChange: getImage }),
                react_1.default.createElement(SubmitButton, { onClick: handleClickSubmitBook }, "\u8FFD\u52A0"))),
        !!errors.length && (react_1.default.createElement(ErrorMessageBox, null, errors.map((error, i) => (react_1.default.createElement(ErrorMessage, { key: i }, error)))))));
}
exports.default = CreateBook;
