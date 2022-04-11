import React, { useState } from 'react'
import styled from 'styled-components'
import {Routes, Route, Link as Li, Outlet } from 'react-router-dom'
import SearchBar from './SearchBar'
import CreateBook from './CreateBook'
import { useSpring, animated } from 'react-spring'
import Hamburger from './Hamburger'

const Base = styled.div`
  width: 100%;
  max-width: 460px;
  height: 100%;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
`
const Links = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
`

const AddBookButton = styled.button`
  margin-right: 10px;
  padding: 3px 10px;
  border-radius: 5px;
  background-color: #eaeded;
  color: #000000;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`
const UpDownAnime = styled(animated.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`
const Link = styled(Li)`
  margin-right: 10px;
  padding: 3px 10px;
  border-radius: 5px;
  background-color: #eaeded;
  color: #000000;
  font-weight: bold;
  border: none;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`
function UserInput() {
  const [toggle, setToggle] = useState(false);
  const spring = useSpring({
    opacity: toggle ? "1" : "0",
    display: toggle ? "block" : "none",
    config: {duration: 250 }
  })

  return (
    <>
      <UpDownAnime style={spring}>
        <CreateBook close={() => setToggle(!toggle)}/>
      </UpDownAnime>
      <Base>
          <Hamburger />
          <Links>
            <Link to="/books">本を並べる</Link>
            <Link to="/pie_chart">パイチャート</Link>
            <AddBookButton onClick={() => setToggle(!toggle)}>本を追加する</AddBookButton>
          </Links>
          <Routes>
            <Route path="/books" element={ <SearchBar />} />
            <Route path="*" element={ <Outlet /> } />
          </Routes>
      </Base>
    </>
  )
}

export default UserInput
