import React from 'react'
import styled from 'styled-components'

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
  return (
    <Base>
      <Title>Sign up</Title>
      <SignupForm>
        <FormLabel>Name</FormLabel>
        <FormText />
        <FormLabel>Email</FormLabel>
        <FormText />
        <FormLabel>Password</FormLabel>
        <FormText />
        <FormLabel>Confirmation</FormLabel>
        <FormText />
        <FormButton>Create my account</FormButton>
      </SignupForm>
    </Base>
  )
}

export default Signup
