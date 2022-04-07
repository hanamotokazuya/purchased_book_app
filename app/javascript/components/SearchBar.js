import React, { useContext, useState } from 'react'
import AppContext from '../contexts/AppContext'
import styled from 'styled-components'
import { SEARCH_EVENT } from '../actions'

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
  const { dispatch } = useContext(AppContext)
  const [searchCategory, setSearchCategory] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")
  const handleClickSearchBook = (e) => {
    e.preventDefault()
    return dispatch({ type: SEARCH_EVENT, searchCategory, searchKeyword })
  }
  return (
    <SearchForm>
      <CategorySelect onChange={(e) => setSearchCategory(e.target.value)}>
        <option>すべて</option>
        <option>制御</option>
        <option>プログラミング</option>
        <option>信号処理</option>
        <option>自動車</option>
        <option>機械学習</option>
        <option>数学</option>
        <option>その他</option>
      </CategorySelect>
      <KeywordInput type="text" placeholder="キーワードを入力してください" onChange={(e) => setSearchKeyword(e.target.value)} />
      <SearchButton onClick={handleClickSearchBook}>検索</SearchButton>
    </SearchForm>
  )
}

export default SearchBar
