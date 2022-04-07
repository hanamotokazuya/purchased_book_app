import { SEARCH_EVENT } from '../actions'

const events = (state = [], action) => {
  switch(action.type) {
    case SEARCH_EVENT:
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
    default:
      return state;
  }
}

export default events
