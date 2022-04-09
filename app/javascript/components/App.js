import AppContext from '../contexts/AppContext'
import events from '../reducers'
import React, { useReducer, useEffect } from 'react'
import Header from './Header'
import Display from './Display'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function App() {
  const initialState = {
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
    console.log("DISPATCH! useEffect check!")
    let name = "";
    let email = "";
    axios.get("api/v1/sessions/check")
    .then(res => {
      if(res.data){
        name = res.data.name;
        email = res.data.email;
      }
    })
  }, [])

  useEffect(() => {
    console.log("DISPATCH! useEffect navigate signin!")
    !state.currentUser.name && navigate("/signin")
  },[state.currentUser.name])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ToastContainer position="bottom-center" hideProgressBar={true}/>
      <Header />
      <Display />
    </AppContext.Provider>
  )
}

export default App
