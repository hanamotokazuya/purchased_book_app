import AppContext from "../contexts/AppContext";
import events from "../reducers";
import React, { useReducer, useEffect } from "react";
import Header from "./Header";
import Display from "./Display";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
};
function App() {
  const initialState: State = {
    isSignIn: false,
    currentUser: {
      name: "",
      email: "",
    },
    books: [],
    showBooks: [],
  };
  const [state, dispatch] = useReducer(events, initialState);
  const navigate = useNavigate();
  useEffect(() => {
    let isSignIn = false;
    axios
      .get("/api/v1/sessions/check")
      .then((res: AxiosResponse<UserData>) => {
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

  useEffect(() => {
    state.isSignIn &&
      axios.get("/api/v1/books/index").then((res: AxiosResponse<Book[]>) => {
        const { data } = res;
        if (data) {
          dispatch({ type: "SHOW_BOOK_EVENT", books: data });
        }
      });
  }, [state.isSignIn]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ToastContainer position="bottom-center" hideProgressBar={true} />
      <Header />
      <Display />
    </AppContext.Provider>
  );
}

export default App;
