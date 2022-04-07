import React from 'react'
import styled from 'styled-components'

const Nabvar = styled.nav`
  background-color: #111111;
  width: 100%;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  width: 95px;
  height: 95px;
  border-color: #eaeded;
  border-style: solid;
  border-radius: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #eaeded;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
`

function Header() {
  return (
    <>
      <Nabvar>
        <Logo>
          <p>書籍</p>
          <p>管理</p>
        </Logo>
      </Nabvar>
    </>
  )
}

export default Header
