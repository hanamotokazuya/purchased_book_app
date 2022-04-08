import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DisplayBook from './DisplayBook'
import DisplayPieChart from './DisplayPieChart'
import styled from 'styled-components'
import Signup from './Signup'

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
  return (
    <Base>
      <Wrapper>
        <Routes>
          <Route path="/" element={<DisplayBook />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pie_chart" element={<DisplayPieChart />}/>
        </Routes>
      </Wrapper>
    </Base>
  )
}

export default Display
