import AppContext from '../contexts/AppContext'
import events from '../reducers'
import React, { useReducer } from 'react'
import Header from './Header'
import Display from './Display'


function App() {
  const initialState = {
    books: [],
    showBooks: [],
  }
  const [state, dispatch] = useReducer(events, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Header />
      <Display />
    </AppContext.Provider>
  )
}

export default App
