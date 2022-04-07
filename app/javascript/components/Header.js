import React from 'react'
import styled from 'styled-components'
import UserInput from './UserInput'

const Base = styled.div`
  background-color: #111111;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

const Wrapper = styled.div`
  padding: 10px;
  width: 85%;
  max-width: 1120px;
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
    <Base>
      <Wrapper>
        <Logo>
          <p>書籍</p>
          <p>管理</p>
        </Logo>
        <UserInput />
      </Wrapper>
    </Base>
  )
}

export default Header
