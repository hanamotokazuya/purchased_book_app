import AppContext from '../contexts/AppContext'
import events from '../reducers'
import React, { useReducer, useEffect, useLayoutEffect } from 'react'
import Header from './Header'
import Display from './Display'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SIGN_IN_EVENT } from '../actions'


function App() {
  const initialState = {
    isSignIn: false,
    currentUser: {
      name: "",
      email: ""
    },
    books: [],
    showBooks: [],
  }
  const [state, dispatch] = useReducer(events, initialState)
  const navigate = useNavigate();
  useLayoutEffect(() => {

    console.log("DISPATCH! useLayoutEffect check!")
    let name = "";
    let email = "";
    let isSignIn = false;
    axios.get("api/v1/sessions/check")
    .then(res => {
      if(res.data){
        isSignIn = true;
        name = res.data.name;
        email = res.data.email;
        dispatch({ type: SIGN_IN_EVENT, name, email})
      }
    })
    .then(() => {
      console.log(`PROMISE ${isSignIn}`)
      isSignIn ? navigate("/book") : navigate("/signin")
    })
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ToastContainer position="bottom-center" hideProgressBar={true}/>
      <Header />
      <Display />
    </AppContext.Provider>
  )
}

export default App
