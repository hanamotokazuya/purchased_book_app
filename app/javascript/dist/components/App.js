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
const AppContext_1 = __importDefault(require("../contexts/AppContext"));
const reducers_1 = __importDefault(require("../reducers"));
const react_1 = __importStar(require("react"));
const Header_1 = __importDefault(require("./Header"));
const Display_1 = __importDefault(require("./Display"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
function App() {
    const initialState = {
        isSignIn: false,
        currentUser: {
            name: "",
            email: "",
        },
        books: [],
        showBooks: [],
    };
    const [state, dispatch] = (0, react_1.useReducer)(reducers_1.default, initialState);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        let isSignIn = false;
        axios_1.default
            .get("/api/v1/sessions/check")
            .then((res) => {
            const { data } = res;
            if (data) {
                isSignIn = true;
                dispatch({ type: "SIGN_IN_EVENT", name: data.name, email: data.email });
            }
        })
            .then(() => {
            isSignIn ? navigate("/books") : navigate("/signin");
        });
    }, []);
    (0, react_1.useEffect)(() => {
        state.isSignIn &&
            axios_1.default.get("/api/v1/books/index").then((res) => {
                const { data } = res;
                if (data) {
                    dispatch({ type: "SHOW_BOOK_EVENT", books: data });
                }
            });
    }, [state.isSignIn]);
    return (react_1.default.createElement(AppContext_1.default.Provider, { value: { state, dispatch } },
        react_1.default.createElement(react_toastify_1.ToastContainer, { position: "bottom-center", hideProgressBar: true }),
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement(Display_1.default, null)));
}
exports.default = App;
