import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`
const Title = styled.h1`
  margin: 6px 0;
  font-size: 48px;
`
const SignupForm = styled.form`
  width: 50%;
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

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const createUser = (e, name, email, password, passwordConfirmation) => {
    e.preventDefault()
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    axios.post("/api/v1/users", {user: data})
    .then(res => {
      console.log(res.data)
      navigate("/book")
    })
    .catch(e => console.log(e))
  }

  return (
    <Base>
      <Title>Sign up</Title>
      <SignupForm>
        <FormLabel>Name</FormLabel>
        <FormText type="text" onChange={(e) => setName(e.target.value)}/>
        <FormLabel>Email</FormLabel>
        <FormText type="text" onChange={(e) => setEmail(e.target.value)}/>
        <FormLabel>Password</FormLabel>
        <FormText type="password" onChange={(e) => setPassword(e.target.value)}/>
        <FormLabel>Confirmation</FormLabel>
        <FormText type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        <FormButton onClick={(e) => createUser(e, name, email, password, passwordConfirmation)}>Create my account</FormButton>
      </SignupForm>
    </Base>
  )
}

export default Signup
