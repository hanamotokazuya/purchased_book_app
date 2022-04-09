import {
  SEARCH_EVENT,
  CREATE_USER_EVENT,
  SIGN_OUT_EVENT,
  SIGN_IN_EVENT
} from '../actions'

const events = (state = [], action) => {
  let currentUser = {};
  switch(action.type) {
    case SEARCH_EVENT:
      console.log("DISPATCH!! SEARCH_EVENT!")
      const keyword = action.searchKeyword
      const category = action.searchCategory
      const keywordRegExp = keyword && keyword !== "" ? new RegExp(keyword, "ui") : /\S+/
      let showBooks = []
      if (!category || category === "すべて") {
        showBooks = state.books.filter((book) => keywordRegExp.test(book.title))
      } else {
        showBooks = state.books.filter((book) => book.category === category && keywordRegExp.test(book.title))
      }
      return { ...state, showBooks }
    case CREATE_USER_EVENT:
      console.log("DISPATCH!! CREATE_USER_EVENT!")
      currentUser = {
        name: action.name,
        email: action.email
      }
      return { ...state, currentUser }
    case SIGN_IN_EVENT:
      console.log("DISPATCH!! SIGN_IN_EVENT!")
      currentUser = {
        name: action.name,
        email: action.email
      }
      return { ...state, currentUser }
    case SIGN_OUT_EVENT:
      console.log("DISPATCH!! SIGN_OUT_EVENT!")
      currentUser = {
        name: "",
        email: ""
      }
      return { ...state, currentUser }
    default:
      return state;
  }
}

export default events
