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
const SigninForm = styled_components_1.default.form `
  font-size: 14px;
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
const FormCheckBoxWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: left;
  align-items: center;
`;
const RememberMeCheckBox = styled_components_1.default.input `
  margin-right: 10px;
`;
const FormCheckBoxLabel = styled_components_1.default.label `
  max-width: 100%;
  font-weight: 500;
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
function SignIn() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [isRemember, setIsRemember] = (0, react_1.useState)(false);
    const [isError, setIsError] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { dispatch } = (0, react_1.useContext)(AppContext_1.default);
    const signIn = (e, email, password, isRemember) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
            remember_me: isRemember,
        };
        axios_1.default
            .post("/api/v1/sessions/create", { session: data }, { withCredentials: true })
            .then((res) => {
            if (res.data && !Array.isArray(res.data)) {
                console.log(res.data);
                dispatch({
                    type: "SIGN_IN_EVENT",
                    name: res.data.name,
                    email: res.data.email,
                });
                react_toastify_1.toast.success("サインイン！");
                navigate("/books");
            }
            else {
                setIsError(!res.data);
            }
        })
            .catch((e) => {
            console.log(e);
        });
    };
    return (react_1.default.createElement(Base, null,
        react_1.default.createElement(Title, null, "\u30B5\u30A4\u30F3\u30A4\u30F3"),
        react_1.default.createElement(SigninForm, null,
            react_1.default.createElement(FormLabel, null, "E\u30E1\u30FC\u30EB"),
            react_1.default.createElement(FormText, { type: "text", onChange: (e) => setEmail(e.target.value) }),
            react_1.default.createElement(FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9"),
            react_1.default.createElement(FormText, { type: "password", onChange: (e) => setPassword(e.target.value) }),
            react_1.default.createElement(FormCheckBoxWrapper, null,
                react_1.default.createElement(RememberMeCheckBox, { type: "checkbox", onChange: () => setIsRemember(!isRemember) }),
                react_1.default.createElement(FormCheckBoxLabel, null, "\u6B21\u56DE\u304B\u3089\u81EA\u52D5\u3067\u30ED\u30B0\u30A4\u30F3")),
            react_1.default.createElement(FormButton, { onClick: (e) => signIn(e, email, password, isRemember) }, "\u30B5\u30A4\u30F3\u30A4\u30F3\u3059\u308B")),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/signup" }, "\u65B0\u898F\u767B\u9332"),
        isError && (react_1.default.createElement(ErrorMessageBox, null,
            react_1.default.createElement(ErrorMessage, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u307E\u305F\u306F\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u9055\u3044\u307E\u3059\u3002")))));
}
exports.default = SignIn;
