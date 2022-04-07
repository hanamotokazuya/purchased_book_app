import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DisplayBook from './DisplayBook'
import DisplayPieChart from './DisplayPieChart'
import styled from 'styled-components'

const Base = styled.div`
  background-color: #33b913;
  height: 100%;
  padding-top: 10px;
`
function Display() {
  return (
    <Base>
      <Routes>
        <Route path="/" element={<DisplayBook />} />
        <Route path="/book" element={<DisplayBook />} />
        <Route path="/pie_chart" element={<DisplayPieChart />}/>
      </Routes>
    </Base>
  )
}

export default Display
