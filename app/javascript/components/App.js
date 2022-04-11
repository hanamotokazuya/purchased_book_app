import AppContext from '../contexts/AppContext'
import events from '../reducers'
import React, { useReducer, useEffect } from 'react'
import Header from './Header'
import Display from './Display'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SIGN_IN_EVENT, SHOW_BOOK_EVENT } from '../constants'


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
  useEffect(() => {
    let isSignIn = false;
    axios.get("/api/v1/sessions/check")
    .then(res => {
      if(res.data){
        isSignIn = true;
        dispatch({ type: SIGN_IN_EVENT, name: res.data.name, email: res.data.email})
      }
    })
    .then(() => {
      isSignIn ? navigate("/books") : navigate("/signin")
    })
  }, [])

  useEffect(() => {
    state.isSignIn && axios.get("/api/v1/books/index")
      .then(res => {
        if(res.data){
          dispatch({ type: SHOW_BOOK_EVENT, books: res.data })
      }
    })
  }, [state.isSignIn])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ToastContainer position="bottom-center" hideProgressBar={true}/>
      <Header />
      <Display />
    </AppContext.Provider>
  )
}

export default App
