import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { pc, tab, sp } from "../utils/media";

const BookLists = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
`;

const BookList = styled.li`
  list-style: none;
  position: relative;
  ${pc`
    padding: 0 10px 20px 10px;
    width: 194px;
    height: ${194 * 1.41}px;
  `}
  ${tab`
    padding: 0 5px 10px 5px;
    width: 170px;
    height: ${170 * 1.41}px;
  `}
  ${sp`
    padding: 0 4px 8px 4px;
    width: 95px;
    height: ${95 * 1.41}px;
  `}
`;
const DeleteIcon = styled(MdDeleteForever)`
  cursor: pointer;
  position: absolute;
  ${pc`
    top: 10px;
    right: 20px;
  `}
  ${tab`
    top: 10px;
    right: 20px;
  `}
  ${sp`
    top: 3px;
    right: 7px;
  `}
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
`;

function DisplayBook() {
  const {
    state: { showBooks },
    dispatch,
  } = useContext(AppContext);
  const handleClickBookDelete = (book: Book) => {
    const isDelete = window.confirm(`${book.title}を削除してよろしいですか？`);
    if (isDelete) {
      axios
        .delete(`/api/v1/books/destroy/${book.id}`)
        .then(() => {
          dispatch({ type: "DELETE_BOOK_EVENT", id: book.id });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <BookLists>
      {!showBooks.length && <p>本がありません。</p>}
      {showBooks.map((book: Book, key: number) => (
        <BookList key={key}>
          <BookImage src={book.url} />
          <DeleteIcon onClick={() => handleClickBookDelete(book)} />
        </BookList>
      ))}
    </BookLists>
  );
}

export default DisplayBook;
