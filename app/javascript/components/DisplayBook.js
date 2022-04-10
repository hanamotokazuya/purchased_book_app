import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../contexts/AppContext'


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
  const {state: { showBooks } } = useContext(AppContext);
  console.log(showBooks)
  return (
    <BookLists>
      {showBooks.map((book, index) => (
        <BookList key={index}>
          <BookImage />
        </BookList>
      ))}
    </BookLists>
  )
}

export default DisplayBook
