import {
  SEARCH_EVENT,
  CREATE_USER_EVENT,
  SIGN_OUT_EVENT,
  SIGN_IN_EVENT,
  SHOW_BOOK_EVENT,
  CREATE_BOOK_EVENT,
  DELETE_BOOK_EVENT
} from '../constants'

const events = (state = [], action) => {
  let isSignIn = false;
  let currentUser = {};
  let books = [];
  let showBooks = [];
  switch(action.type) {
    case SEARCH_EVENT:
      const keyword = action.searchKeyword
      const category = action.searchCategory
      const keywordRegExp = keyword && keyword !== "" ? new RegExp(keyword, "ui") : /\S+/
      if (!category || category === "すべて") {
        showBooks = state.books.filter((book) => keywordRegExp.test(book.title))
      } else {
        showBooks = state.books.filter((book) => book.category === category && keywordRegExp.test(book.title))
      }
      return { ...state, showBooks }

    case CREATE_USER_EVENT:
      isSignIn = true;
      currentUser = {
        name: action.name,
        email: action.email
      }
      return { ...state, isSignIn, currentUser }

    case SIGN_IN_EVENT:
      isSignIn = true;
      currentUser = {
        name: action.name,
        email: action.email
      }
      return { ...state, isSignIn, currentUser }

    case SIGN_OUT_EVENT:
      isSignIn = false;
      currentUser = {
        name: "",
        email: ""
      }
      return { ...state, isSignIn, currentUser }

    case SHOW_BOOK_EVENT:
      books = action.books;
      showBooks = [...books];
      return { ...state, books, showBooks }

    case CREATE_BOOK_EVENT:
      books = [action.book, ...state.books];
      showBooks = [...books]
      return { ...state, books, showBooks }

    case DELETE_BOOK_EVENT:
      return ({ ...state,
                books: [...state.books].filter((book) => book.id !== action.id),
                showBooks: [...state.showBooks].filter((book) => book.id !== action.id)
              })
    default:
      return state;
  }
}

export default events
