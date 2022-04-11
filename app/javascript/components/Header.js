import React, { useContext, useState } from 'react'
import { SIGN_OUT_EVENT } from '../actions'
import styled from 'styled-components'
import UserInput from './UserInput'
import AppContext from '../contexts/AppContext'
import useInterval from '../utils/useInterval'
import { Link as Li } from 'react-router-dom'
import axios from 'axios'

const Base = styled.header`
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

const ResultBookCount = styled.p`
  color: #eaeded;
  margin: 0 auto;
  font-size: 64px;
  font-weight: bold;
  &::after {
    content: "冊";
    font-size: 32px;
  }
`
const Link = styled(Li)`
  color: white;
  background-color: #337ab7;
  margin-right: 10px;
  padding: 3px 10px;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`
const LinkWrapper = styled.div`
  height: 100%;
  padding: 5px;
`
function Header() {

  const { state: { showBooks, currentUser: { name: user } }, dispatch} = useContext(AppContext)
  const [resultBookCount, setResultBookCount] = useState(0)
  function countUpDown() {
    resultBookCount < showBooks.length && setResultBookCount(resultBookCount + 1)
    resultBookCount > showBooks.length && setResultBookCount(resultBookCount - 1)
  }

  const signout = () => {
    // sessionとcookiesを掃除する処理を書く
    axios.delete("/api/v1/sessions/destroy")
    // カレントユーザーのステートを初期化する
    dispatch({ type: SIGN_OUT_EVENT })
  }
  useInterval(countUpDown, 10);

  return (
    <Base>
      <Wrapper>
        <Logo>
          <p>書籍</p>
          <p>管理</p>
        </Logo>
        {!!user &&
          <>
            <UserInput />
            <ResultBookCount>{resultBookCount}</ResultBookCount>
            <LinkWrapper>
              <Link to="/signin" onClick={signout}>サインアウト</Link>
            </LinkWrapper>
          </>
        }
      </Wrapper>
    </Base>
  )
}

export default Header
