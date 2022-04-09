import React, {useContext } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import DisplayBook from './DisplayBook'
import DisplayPieChart from './DisplayPieChart'
import styled from 'styled-components'
import Signup from './Signup'
import Signin from './Signin'
import AppContext from '../contexts/AppContext'

const Base = styled.div`
  background-color: #33b913;
  height: 100%;
  padding-top: 10px;
`
const Wrapper = styled.div`
  width: 85%;
  height: 100%;
  margin: 0 auto;
  max-width: 1120px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #eaeded;
  border-radius: 10px;
  display: flex;
  justify-content: center;
`
function Display() {
  const {state: { currentUser: { name: user } } } = useContext(AppContext);
  return (
    <Base>
      <Wrapper>
        {!!user ?
          <Routes>
            <Route path="/book" element={<DisplayBook />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pie_chart" element={<DisplayPieChart />}/>
            <Route path="*" element={ <Outlet /> } />
          </Routes> :
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={ <Outlet /> } />
          </Routes>
        }
      </Wrapper>
    </Base>
  )
}

export default Display
