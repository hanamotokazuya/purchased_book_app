import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../contexts/AppContext'
import { DELETE_BOOK_EVENT } from '../actions'
import axios from 'axios'


const BookLists = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`

const BookList = styled.li`
  list-style: none;
  width: 350px;
  height: 467px;
  padding: 0 10px 20px 10px;
`

const BookImage = styled.div`
  height: 100%;
  background-color: blue;
`

function DisplayBook() {
  const {state: { showBooks }, dispatch } = useContext(AppContext);
  const handleClickBookDelete = (book) => {
    axios.delete(`/api/v1/books/destroy/${book.id}`)
    .then(() => {
      dispatch({ type: DELETE_BOOK_EVENT, id: book.id })
    })
    .catch((e) => {
      console.log(e)
    })
  }
  console.log(showBooks)
  return (
    <BookLists>
      {showBooks.map((book, key) => (
        <BookList key={key} onClick={() => handleClickBookDelete(book)}>
          <BookImage />{book.title}
        </BookList>
      ))}
    </BookLists>
  )
}

export default DisplayBook
