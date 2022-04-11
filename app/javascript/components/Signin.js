import React, { useState, useContext } from 'react'
import AppContext from '../contexts/AppContext'
import { SIGN_IN_EVENT } from '../actions'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'

const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`
const Title = styled.h1`
  margin: 6px 0;
  font-size: 20px;
`
const SigninForm = styled.form`
  font-size: 14px;
  width: 50%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const FormLabel = styled.label`
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
`
const FormText = styled.input`
  width: 100%;
  padding: 6px;
  font-size: 14px;
  line-height: 1.4;
  color: #555555;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  margin-bottom: 15px;
`
const FormCheckBoxWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`
const RememberMeCheckBox = styled.input`
  margin-right: 10px;
`
const FormCheckBoxLabel = styled.label`
  max-width: 100%;
  font-weight: 500;
`
const FormButton = styled.button`
  margin-top: 10px;
  width: 100%;
  color: white;
  background-color: #337ab7;
  border-color: #2e6da4;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 6px;
  font-size: 14px;
  border-radius: 4px;
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
  font-size: 12px;
`


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const signIn = (e, email, password, isRemember) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password,
      remember_me: isRemember
    }
    axios.post("/api/v1/sessions/create", {session: data}, { withCredentials: true })
    .then(res => {
      if (res.data && !Array.isArray(res.data)) {
        console.log(res.data)
      dispatch({
        type: SIGN_IN_EVENT,
        name: res.data.name,
        email: res.data.email
      })
      toast.success("サインイン！")
      navigate("/books")
      } else {
        setIsError(!res.data)
      }
    })
    .catch(e => {
      console.log(e)
    })
  }
  return (
    <Base>
      <Title>サインイン</Title>
      <SigninForm>
        <FormLabel>Eメール</FormLabel>
        <FormText type="text" onChange={(e) => setEmail(e.target.value)}/>
        <FormLabel>パスワード</FormLabel>
        <FormText type="password" onChange={(e) => setPassword(e.target.value)}/>
        <FormCheckBoxWrapper>
          <RememberMeCheckBox type="checkbox" onChange={() => setIsRemember(!isRemember)}/>
          <FormCheckBoxLabel>次回から自動でログイン</FormCheckBoxLabel>
        </FormCheckBoxWrapper>
        <FormButton onClick={(e) => signIn(e, email, password, isRemember)}>サインインする</FormButton>
      </SigninForm>
      <Link to="/signup">新規登録</Link>
      {isError &&
        (<ErrorMessageBox>
          <ErrorMessage>メールアドレスまたはパスワードが違います。</ErrorMessage>
        </ErrorMessageBox>)
      }
    </Base>
  )
}

export default SignIn
