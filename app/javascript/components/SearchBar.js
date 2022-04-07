import React from 'react'
import styled from 'styled-components'

const SearchForm = styled.form`
  padding: 5px;
  display:flex;
`
const CategorySelect = styled.select`
  margin-right: 10px;
`
const KeywordInput = styled.input`
  width: 250px;
  margin-right: 10px;
`
const SearchButton = styled.button`
  border-radius: 5px;
  background-color: #eaeded;
  color: #000000;
  font-weight: bold;
  border: none;
`



function SearchBar() {
  return (
    <SearchForm>
      <CategorySelect>
        <option>すべて</option>
        <option>制御</option>
        <option>プログラミング</option>
        <option>信号処理</option>
        <option>自動車</option>
        <option>機械学習</option>
        <option>数学</option>
        <option>その他</option>
      </CategorySelect>
      <KeywordInput />
      <SearchButton>検索</SearchButton>
    </SearchForm>
  )
}

export default SearchBar
