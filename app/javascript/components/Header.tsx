import React, {useContext, useState} from "react";
import {Routes, Route} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {pc, tab, sp} from "../utils/media";
import AppContext from "../contexts/AppContext";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";


axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
};

function Header() {
  const {state: {isSignIn}} = useContext(AppContext);

  return (
    <Base>
      <div className="wrapper">
        <LeftSide>
          <Logo>書籍<br />管理</Logo>
          {isSignIn && (
            <Routes>
              <Route path="/books" element={<SearchBar />} />
              <Route path="*" element={<Blank />} />
            </Routes>
          )}
        </LeftSide>
        {isSignIn && (<Navbar />)}
      </div>
    </Base>
  );
}
// <Hamburger signout={signout} addBook={() => setIsOpenAddPage(!isOpenAddPage)} />

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
`;

const Logo = styled.h1`
border-color: #eaeded;
border-radius: 35%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: #eaeded;
width: 64px
height: 64px;
font-size: 16px;
${pc`
  border 4px solid;
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
`
