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
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
const Base = styled_components_1.default.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;
const Title = styled_components_1.default.h1 `
  margin: 6px 0;
  font-size: 20px;
`;
const SignupForm = styled_components_1.default.form `
  width: 50%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const FormLabel = styled_components_1.default.label `
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
`;
const FormText = styled_components_1.default.input `
  width: 100%;
  padding: 6px;
  font-size: 14px;
  line-height: 1.4;
  color: #555555;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  margin-bottom: 15px;
`;
const FormButton = styled_components_1.default.button `
  margin-top: 10px;
  width: 100%;
  color: white;
  background-color: #337ab7;
  border-color: #2e6da4;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 6px;
  font-size: 14px;
  border-radius: 4px;
`;
const ErrorMessageBox = styled_components_1.default.div `
  margin-top: 10px;
  max-width: 100%;
  padding: 10px;
  color: red;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  margin-bottom: 15px;
`;
const ErrorMessage = styled_components_1.default.p `
  font-size: 12px;
`;
function Signup() {
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [passwordConfirmation, setPasswordConfirmation] = (0, react_1.useState)("");
    const [errors, setErrors] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { dispatch } = (0, react_1.useContext)(AppContext_1.default);
    const createUser = (e, name, email, password, passwordConfirmation) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        };
        axios_1.default
            .post("/api/v1/users", { user: data })
            .then((res) => {
            if (!Array.isArray(res.data)) {
                console.log(res.data);
                dispatch({
                    type: "CREATE_USER_EVENT",
                    name: res.data.name,
                    email: res.data.email,
                });
                react_toastify_1.toast.success("登録完了！");
                navigate("/books");
            }
            else {
                setErrors(res.data);
            }
        })
            .catch((e) => {
            console.log(e);
        });
    };
    return (react_1.default.createElement(Base, null,
        react_1.default.createElement(Title, null, "\u30B5\u30A4\u30F3\u30A2\u30C3\u30D7"),
        react_1.default.createElement(SignupForm, null,
            react_1.default.createElement(FormLabel, null, "\u540D\u524D"),
            react_1.default.createElement(FormText, { type: "text", onChange: (e) => setName(e.target.value) }),
            react_1.default.createElement(FormLabel, null, "E\u30E1\u30FC\u30EB"),
            react_1.default.createElement(FormText, { type: "text", onChange: (e) => setEmail(e.target.value) }),
            react_1.default.createElement(FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9"),
            react_1.default.createElement(FormText, { type: "password", onChange: (e) => setPassword(e.target.value) }),
            react_1.default.createElement(FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9(\u78BA\u8A8D\u7528)"),
            react_1.default.createElement(FormText, { type: "password", onChange: (e) => setPasswordConfirmation(e.target.value) }),
            react_1.default.createElement(FormButton, { onClick: (e) => createUser(e, name, email, password, passwordConfirmation) }, "Create my account")),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/signin" }, "\u30B5\u30A4\u30F3\u30A4\u30F3"),
        !!errors.length && (react_1.default.createElement(ErrorMessageBox, null, errors.map((error, i) => (react_1.default.createElement(ErrorMessage, { key: i }, error)))))));
}
exports.default = Signup;
