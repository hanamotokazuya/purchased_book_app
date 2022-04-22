import React, {useState, useContext} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {IconContext} from "react-icons";
import {GiHamburgerMenu} from "react-icons/gi";
import {tab, sp} from "../utils/media";
import CreateBook from "./CreateBook";
import axios from "axios";
import AppContext from "../contexts/AppContext";


axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
};

function Navbar() {
  const {dispatch} = useContext(AppContext);
  const [isOpenAddPage, setIsOpenAddPage] = useState(false);
  const [isOpenHam, setIsOpenHam] = useState(false);
  const signout = () => {
    // sessionとcookiesを掃除する処理を書く
    axios.delete("/api/v1/sessions/destroy");
    // カレントユーザーのステートを初期化する
    dispatch({type: "SIGN_OUT_EVENT"});
  };
  return (
    <>
      <CSSTransition in={isOpenAddPage} timeout={700} classNames="fade" unmountOnExit>
        <CreateBook close={() => setIsOpenAddPage(!isOpenAddPage)} />
      </CSSTransition>
      <Nav>
        <Link className="link" to="/books">本を並べる</Link>
        <Link className="link" to="/pie_chart">パイチャート</Link>
        <button className="add-book-btn" onClick={() => setIsOpenAddPage(!isOpenAddPage)}>本を追加する</button>
        <Link className="link" onClick={signout} to="/signin">サインアウト</Link>
      </Nav>
      <Hamburger>
        <IconContext.Provider value={{color: "#eaeded", size: "64px"}}>
          <GiHamburgerMenu className="ham-icon" onClick={() => setIsOpenHam(!isOpenHam)} />
        </IconContext.Provider>
        <CSSTransition in={isOpenHam} timeout={700} classNames="slide-ham" unmountOnExit>
          <div className="ham-items">
            <Link className="ham-item txt-deco-none" onClick={() => setIsOpenHam(!isOpenHam)} to="/books">本を並べる</Link>
            <Link className="ham-item txt-deco-none" onClick={() => setIsOpenHam(!isOpenHam)} to="/pie_chart">パイチャート</Link>
            <div className="ham-item" onClick={() => {setIsOpenAddPage(!isOpenAddPage); setIsOpenHam(!isOpenHam)}}>本を追加する</div>
            <Link className="ham-item txt-deco-none" onClick={signout} to="/signin">サインアウト</Link>
          </div>
        </CSSTransition>
        <div className={isOpenHam ? "ham-shadow" : "disp-none"} onClick={() => setIsOpenHam(!isOpenHam)} />
      </Hamburger>
    </>
  )
}

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: right;
  display: block;
  ${tab`
    display: none;
  `}
  ${sp`
    display: none;
  `}
  .link {
    font-size: 14px;
    padding: 3px 10px;
    color: white;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: #eb6100;
    }
  }
  .add-book-btn {
    color: white;
    font-size: 14px;
    border: none;
    padding: 3px 10px;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      background-color: #eb6100;
    }
}
`;
const Hamburger = styled.div`
display: none;
${tab`
  display: block;
`}
${sp`
  display: block;
`}
.ham-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.ham-items {
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
}
.ham-item {
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px;
  padding: 3px 10px;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
}
.txt-deco-none {
  text-decoration: none;
}
.slide-ham-enter {
  right: -50%;
}
.slide-ham-enter-active {
  right: 0;
  transition: right 0.3s;
}
.slide-ham-exit {
  right: 0;
}
.slide-ham-exit-active {
  right: -50%;
  transition: right 0.3s;
}
.ham-shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.disp-none {
  display: none;
}
`;
