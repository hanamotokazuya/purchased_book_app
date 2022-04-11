import React, { useState, useContext } from 'react'
import AppContext from '../contexts/AppContext'
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CREATE_BOOK_EVENT } from '../actions'
import { useNavigate } from 'react-router-dom'
import { CgClose } from 'react-icons/cg'
const Base = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Wrapper = styled.div`
  width: 350px;
  height: 200px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
  background-color: white;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`
const Icon = styled.div`
  width: 300px;
  display: flex;
  justify-content: right;
  margin-bottom: 5px;
`
const CreateBookForm = styled.form`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`
const CategorySelect = styled.select`
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
`
const TitleInput = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
`
const FileField = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
`
const SubmitButton = styled.button`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  background-color: white;
  color: #000000;
  font-weight: bold;
`
const ErrorMessageBox = styled.div`
  width: 350px;
  padding: 10px;
  margin-top: 10px;
  color: red;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
`
const ErrorMessage = styled.p`
  font-size: 14px;
`
function CreateBook({ close }) {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const [errors, setErrors] = useState([]);

  const getImage = e => {
    const reader = new FileReader();
    const files = e.target.files;
    if (files) {
      reader.onload = () => {
        setImage({
          data: reader.result,
          name: Math.random().toString(36).slice(-8)
        })
      }
      reader.readAsDataURL(files[0])
    }
  };
  const handleClickSubmitBook = (e) => {
    e.preventDefault()
    const data = { title, category, image }
    axios.post("/api/v1/books/create", { book: data })
    .then(res => {
      if (!Array.isArray(res.data)) {
        console.log(res.data)
        dispatch({
          type: CREATE_BOOK_EVENT,
          book: res.data
        })
        toast.success("新しく本が追加されました！")
        setTitle("")
        setCategory("")
        setImage([])
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
      <Wrapper>
        <Icon><CgClose style={ { cursor: "pointer" } } onClick={close}/></Icon>
        <CreateBookForm>
          <TitleInput type="text" value={title} placeholder="本のタイトルを入力してください" onChange={(e) => setTitle(e.target.value)} />
          <CategorySelect value={category}onChange={(e) => setCategory(e.target.value)}>
            <option hidden>選択してください</option>
            <option>制御</option>
            <option>プログラミング</option>
            <option>信号処理</option>
            <option>自動車</option>
            <option>機械学習</option>
            <option>数学</option>
            <option>その他</option>
          </CategorySelect>
          <FileField type="file" accept='image/*,.png,.jpg,.jpeg,.gif' onChange={getImage}/>
          <SubmitButton onClick={handleClickSubmitBook}>追加</SubmitButton>
        </CreateBookForm>
      </Wrapper>
      {!!errors.length &&
        (<ErrorMessageBox>
          {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
        </ErrorMessageBox>)
      }
    </Base>
  )
}

export default CreateBook
