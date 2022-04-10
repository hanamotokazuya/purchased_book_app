import React, { useState, useContext } from 'react'
import AppContext from '../contexts/AppContext'
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CREATE_BOOK_EVENT } from '../actions'
import { useNavigate } from 'react-router-dom'

const Base = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content:left;
`
const CreateBookForm = styled.form`
  width: 100%;
  height: 35px;
  padding: 5px;
  display:flex;
`
const CategorySelect = styled.select`
  height: 30px;
  margin-right: 10px;
`
const TitleInput = styled.input`
  width: 350px;
  height: 30px;
  margin-right: 10px;
`
const SubmitButton = styled.button`
  height: 30px;
  border-radius: 5px;
  background-color: white;
  color: #000000;
  font-weight: bold;
`
const ErrorMessageBox = styled.div`
  margin-top: 10px;
  max-width: 100%;
  padding: 10px;
  color: red;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  margin-bottom: 15px;
`
const ErrorMessage = styled.p`
  font-size: 14px;
`
function CreateBook() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState([]);

  const handleClickSubmitBook = (e, title, category) => {
    e.preventDefault()
    const data = { title, category }
    axios.post("/api/v1/books/create", { book: data })
    .then(res => {
      if (!Array.isArray(res.data)) {
        console.log(res.data)
        dispatch({
          type: CREATE_BOOK_EVENT,
          title: res.data.title,
          category: res.data.category
        })
        toast.success("新しく本が追加されました！")
        navigate("/books")
      } else {
        setErrors(res.data)
      }
    })
    .catch(e => {
      console.log(e)
    })
  }
  return (
    <Base>
      <CreateBookForm>
        <TitleInput type="text" placeholder="本のタイトルを入力してください" onChange={(e) => setTitle(e.target.value)} />
        <CategorySelect onChange={(e) => setCategory(e.target.value)}>
          <option hidden>選択してください</option>
          <option>制御</option>
          <option>プログラミング</option>
          <option>信号処理</option>
          <option>自動車</option>
          <option>機械学習</option>
          <option>数学</option>
          <option>その他</option>
        </CategorySelect>
        <SubmitButton onClick={(e) => handleClickSubmitBook(e, title, category)}>追加</SubmitButton>
      </CreateBookForm>
      {!!errors.length &&
        (<ErrorMessageBox>
          {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
        </ErrorMessageBox>)
      }
    </Base>
  )
}

export default CreateBook
