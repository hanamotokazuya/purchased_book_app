import React from 'react'
import styled from 'styled-components'
import {Routes, Route, Link, Outlet } from 'react-router-dom'
import SearchBar from './SearchBar'

const Base = styled.div`
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
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

const Button = styled.button`
  margin-right: 10px;
  padding: 3px 10px;
  border-radius: 5px;
  background-color: #eaeded;
  color: #000000;
  font-weight: bold;
  border: none;
`

function UserInput() {

  return (
    <Base>
      <Wrapper>
        <Links>
        <Button>
          <Link to="/">本を並べる</Link>
        </Button>
        <Button>
          <Link to="/pie_chart">パイチャート</Link>
        </Button>
        </Links>
        <Routes>
          <Route path="/book" element={ <SearchBar />} />
          <Route path="*" element={ <Outlet /> } />
        </Routes>
      </Wrapper>
    </Base>
  )
}

export default UserInput
