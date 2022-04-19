import React, {useContext, useState} from "react";
import AppContext from "../contexts/AppContext";
import styled from "styled-components";
import {CATEGORIES} from "../constants";
import useInterval from "../utils/useInterval";
import {tab, sp} from "../utils/media";


function SearchBar() {
  const {state: {showBooks}, dispatch, } = useContext(AppContext);
  const [resultBookCount, setResultBookCount] = useState(0);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const countUpDown = () => {
    resultBookCount < showBooks.length && setResultBookCount(resultBookCount + 1);
    resultBookCount > showBooks.length && setResultBookCount(resultBookCount - 1);
  }
  const handleClickSearchBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return dispatch({type: "SEARCH_EVENT", searchCategory, searchKeyword});
  };
  useInterval(countUpDown, 10);

  return (
    <Base>
      <form className="search-form">
        <input
          className="keyword"
          type="text"
          placeholder="キーワードを入力してください"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <div className="category-wrapper">
          <select className="category" onChange={(e) => setSearchCategory(e.target.value)}>
            <option>すべて</option>
            {CATEGORIES.map((category, key) => (<option key={key}>{category}</option>))}
          </select>
          <button className="search-btn" onClick={handleClickSearchBook}>検索</button>
        </div>
      </form>
      <p className="result-book-count">{resultBookCount}</p>
    </Base>
  );
}

export default SearchBar;

const Base = styled.div`
display: flex;
align-items: center;
.search-form {
  font-size: 12px;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.keyword {
  width: 200px;
  margin-bottom: 5px;
}
.category-wrapper {
  display: flex;
}
.category {
  margin-right: 10px;
}
.search-btn {
  border-radius: 5px;
  background-color: #eaeded;
  color: #000000;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
.result-book-count {
  color: #eaeded;
  font-weight: bold;
  font-size: 48px;
  &::after {
    content: "冊";
    font-size: 16px;
  }
  ${tab`
    font-size: 32px;
    &::after {
      font-size: 16px;
    }
  `}
  ${sp`
    font-size: 16px;
    &::after {
      font-size: 8px;
    }
  `}
}
`
