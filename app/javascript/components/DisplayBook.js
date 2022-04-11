import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../contexts/AppContext'
import { DELETE_BOOK_EVENT } from '../actions'
import axios from 'axios'
import { MdDeleteForever } from 'react-icons/md'

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
const ImageTitleWrapper = styled.div`
  padding-top: 3px;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: space-between;
`
const ImageTitle = styled.p`
  font-size: 13px;
`

const BookImage = styled.img`
  height: 100%;
  /* background-color: blue; */
`

function DisplayBook() {
  const {state: { showBooks }, dispatch } = useContext(AppContext);
  const handleClickBookDelete = (book) => {
    const isDelete = window.confirm(`${book.title}を削除してよろしいですか？`)
    if(isDelete) {
      axios.delete(`/api/v1/books/destroy/${book.id}`)
      .then(() => {
        dispatch({ type: DELETE_BOOK_EVENT, id: book.id })
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }
  return (
    <BookLists>
      {showBooks.map((book, key) => (
        <BookList key={key}>
          <BookImage src={book.url}/>
          <ImageTitleWrapper>
            <ImageTitle>{book.title}</ImageTitle>
            <MdDeleteForever onClick={() => handleClickBookDelete(book)} />
          </ImageTitleWrapper>
        </BookList>
      ))}
    </BookLists>
  )
}

export default DisplayBook
