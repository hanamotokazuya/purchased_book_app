import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DisplayBook from './DisplayBook'
import DisplayPieChart from './DisplayPieChart'

function Display() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DisplayBook />} />
        <Route path="/book" element={<DisplayBook />} />
        <Route path="/pie_chart" element={<DisplayPieChart />}/>
      </Routes>
    </>
  )
}

export default Display
