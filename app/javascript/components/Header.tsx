import React, {useContext, useState} from "react";
import {Routes, Route, Link, Outlet} from "react-router-dom";
import {useSpring, animated} from "react-spring";
import styled from "styled-components";
import axios from "axios";
import {pc, tab, sp} from "../utils/media";
import AppContext from "../contexts/AppContext";
import useInterval from "../utils/useInterval";
import Hamburger from "./Hamburger";
import CreateBook from "./CreateBook";
import SearchBar from "./SearchBar";
import {CSSTransition} from "react-transition-group";

axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
};


function Header() {
  const {
    state: {showBooks, isSignIn},
    dispatch,
  } = useContext(AppContext);
  const [resultBookCount, setResultBookCount] = useState(0);
  const [isOpenAddPage, setIsOpenAddPage] = useState(false);
  const spring = useSpring({
    opacity: isOpenAddPage ? "1" : "0",
    display: isOpenAddPage ? "block" : "none",
    config: {duration: 250},
  });
  function countUpDown() {
    resultBookCount < showBooks.length && setResultBookCount(resultBookCount + 1);
    resultBookCount > showBooks.length && setResultBookCount(resultBookCount - 1);
  }

  const signout = () => {
    // sessionとcookiesを掃除する処理を書く
    axios.delete("/api/v1/sessions/destroy");
    // カレントユーザーのステートを初期化する
    dispatch({type: "SIGN_OUT_EVENT"});
  };
  useInterval(countUpDown, 10);

  return (
    <Base>
      <div className="wrapper">
        <LeftSide>
          <Logo>書籍<br />管理</Logo>
          {isSignIn && (
            <>
              <CSSTransition in={isOpenAddPage} timeout={700} classNames="fade" unmountOnExit>
                <CreateBook close={() => setIsOpenAddPage(!isOpenAddPage)} />
              </CSSTransition>
              <Routes>
                <Route path="/books" element={<SearchBar />} />
                <Route path="*" element={<Outlet />} />
              </Routes>
              <Routes>
                <Route path="/books" element={<p className="result-book-count">{resultBookCount}</p>} />
                <Route path="*" element={<Blank />} />
              </Routes>
            </>
          )}
        </LeftSide>
        {isSignIn && (
          <>
            <Nav>
              <Link className="link" to="/books">本を並べる</Link>
              <Link className="link" to="/pie_chart">パイチャート</Link>
              <button className="add-book-btn" onClick={() => setIsOpenAddPage(!isOpenAddPage)}>本を追加する</button>
              <Link className="link" to="/signin" onClick={signout}>サインアウト</Link>
            </Nav>
            <Hamburger signout={signout} addBook={() => setIsOpenAddPage(!isOpenAddPage)} />
          </>
        )}
      </div>
    </Base>
  );
}

export default Header;

const Base = styled.header`
  position: fixed;
  z-index: 10;
  background-color: #111111;
  width: 100%;
  .wrapper {
    margin: 0 auto;
    padding: 10px;
    max-width: 1024px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const LeftSide = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 72px;
  ${tab`
    height: 56px;
  `}
  ${sp`
    height: 56px;
  `}
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
  transition: opacity 0.3s;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .result-book-count {
    color: #eaeded;
    font-weight: bold;
    font-size: 48px;
    &::after {
      content: "冊";
      font-size: 16px;
    }
    ${tab`
      font-size: 32px;
      &::after {
        font-size: 16px;
      }
    `}
    ${sp`
      font-size: 16px;
      &::after {
        font-size: 8px;
      }
    `}
  }
`;

const Logo = styled.h1`
  border-color: #eaeded;
  border-radius: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #eaeded;
  ${pc`
    border 4px solid;
    width: 64px;
    height: 64px;
    font-size: 16px;
    font-weight: bold;
  `}
  ${tab`
    border 2px solid;
    width: 32px;
    height: 32px;
    font-size: 8px;
  `}
  ${sp`
    width: 16px;
    height: 16px;
    font-size: 8px;
  `}
`;

const Blank = styled.div`
  margin: 0 auto;
`;
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

