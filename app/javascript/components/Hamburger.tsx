import React, { useState } from "react";
import { Link as Li } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { pc, tab, sp } from "../utils/media";

const Base = styled.div`
  ${pc`
    display: none;
  `}
  ${tab`
    display: block;
  `}
  ${sp`
    display: block;
  `}
`;
const Menu = styled(GiHamburgerMenu)`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
const MenuItems = styled(animated.div)`
  width: 150px;
  font-size: 14px;
  background-color: white;
  position: fixed;
  top: 76px;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  z-index: 1000;
`;
const ItemL = styled(Li)`
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px;
  padding: 3px 10px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`;
const ItemB = styled.div`
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px;
  padding: 3px 10px;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: #eb6100;
  }
`;

type Props = {
  signout: React.MouseEventHandler;
  addBook: React.MouseEventHandler;
};

function Hamburger({ signout, addBook }: Props) {
  const [isOpenHam, SetIsOpenHam] = useState(false);
  const MenuSpring = useSpring({ right: isOpenHam ? "0" : "-200px" });
  return (
    <Base>
      <IconContext.Provider value={{ color: "#eaeded", size: "64px" }}>
        <Menu onClick={() => SetIsOpenHam(!isOpenHam)} />
        <MenuItems style={MenuSpring}>
          <ItemL to="/books">本を並べる</ItemL>
          <ItemL to="/pie_chart">パイチャート</ItemL>
          <ItemB onClick={addBook}>本を追加する</ItemB>
          <ItemL to="/signin" onClick={signout}>
            サインアウト
          </ItemL>
        </MenuItems>
      </IconContext.Provider>
    </Base>
  );
}

export default Hamburger;
