import React, { useContext, useState } from "react";
import { Routes, Route, Link as Li, Outlet } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import axios from "axios";
import { pc, tab, sp } from "../utils/media";
import AppContext from "../contexts/AppContext";
import useInterval from "../utils/useInterval";
import Hamburger from "./Hamburger";
import CreateBook from "./CreateBook";
import SearchBar from "./SearchBar";

axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
};

const Base = styled.header`
  position: fixed;
  z-index: 10;
  background-color: #111111;
  width: 100%;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  padding: 10px;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftSide = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  ${pc`
  height: 72px;
  `}
  ${tab`
  height: 56px;
  `}
  ${sp`
  height: 56px;
  `}
`;

const Logo = styled.div`
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

const ResultBookCount = styled.p`
  color: #eaeded;
  font-weight: bold;
  ${pc`
    font-size: 48px;
    &::after {
      content: "冊";
      font-size: 16px;
    }
  `}
  ${tab`
    font-size: 32px;
    &::after {
      content: "冊";
      font-size: 16px;
    }
  `}
  ${sp`
    font-size: 16px;
    &::after {
      content: "冊";
      font-size: 8px;
    }
  `}
`;
const Blank = styled.div`
  margin: 0 auto;
`;
const Links = styled.div`
  display: flex;
  justify-content: right;
  ${pc`
    display: block;
  `}
  ${tab`
    display: none;
  `}
  ${sp`
    display: none;
  `}
`;

const AddBookButton = styled.button`
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
const UpDownAnime = styled(animated.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;
const Link = styled(Li)`
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
  const {
    state: { showBooks, isSignIn },
    dispatch,
  } = useContext(AppContext);
  const [resultBookCount, setResultBookCount] = useState(0);
  const [isOpenAddPage, setIsOpenAddPage] = useState(false);
  const spring = useSpring({
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
    axios.delete("/api/v1/sessions/destroy");
    // カレントユーザーのステートを初期化する
    dispatch({ type: "SIGN_OUT_EVENT" });
  };
  useInterval(countUpDown, 10);

  return (
    <Base>
      <Wrapper>
        <LeftSide>
          <Logo>
            <p>
              書籍
              <br />
              管理
            </p>
          </Logo>
          {isSignIn && (
            <>
              <UpDownAnime style={spring}>
                <CreateBook close={() => setIsOpenAddPage(!isOpenAddPage)} />
              </UpDownAnime>
              <Routes>
                <Route path="/books" element={<SearchBar />} />
                <Route path="*" element={<Outlet />} />
              </Routes>
              <Routes>
                <Route
                  path="/books"
                  element={<ResultBookCount>{resultBookCount}</ResultBookCount>}
                />
                <Route path="*" element={<Blank />} />
              </Routes>
            </>
          )}
        </LeftSide>
        {isSignIn && (
          <>
            <Links>
              <Link to="/books">本を並べる</Link>
              <Link to="/pie_chart">パイチャート</Link>
              <AddBookButton onClick={() => setIsOpenAddPage(!isOpenAddPage)}>
                本を追加する
              </AddBookButton>
              <Link to="/signin" onClick={signout}>
                サインアウト
              </Link>
            </Links>
            <Hamburger signout={signout} addBook={() => setIsOpenAddPage(!isOpenAddPage)} />
          </>
        )}
      </Wrapper>
    </Base>
  );
}

export default Header;
