import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import DisplayBook from "./DisplayBook";
import DisplayPieChart from "./DisplayPieChart";
import styled from "styled-components";
import Signup from "./Signup";
import Signin from "./Signin";
import AppContext from "../contexts/AppContext";
import { pc, tab, sp } from "../utils/media";

function Display() {
  const {
    state: {
      currentUser: { name: user },
    },
  } = useContext(AppContext);
  return (
    <Base>
      <Wrapper>
        {!!user ? (
          <Routes>
            <Route path="/books" element={<DisplayBook />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pie_chart" element={<DisplayPieChart />} />
            <Route path="*" element={<Outlet />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Outlet />} />
          </Routes>
        )}
      </Wrapper>
    </Base>
  );
}

export default Display;

const Base = styled.div`
  background-color: #33b913;
  padding-top: 10px;
  padding-bottom: 10px;
  ${pc`
    transform: translateY(92px);
  `}
  ${tab`
    transform: translateY(76px);
  `}
  ${sp`
    transform: translateY(76px);
  `}
`;
const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 1024px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #eaeded;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
