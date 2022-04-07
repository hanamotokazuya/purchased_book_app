import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  width: 85%;
  margin: 0 auto;
  max-width: 1120px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #eaeded;
  border-radius: 10px;
  display: flex;
  justify-content: center;
`

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
  return (
    <Base>
      <BookLists>
        <BookList>
          <BookImage />
        </BookList>
      </BookLists>
    </Base>
  )
}

export default DisplayBook
