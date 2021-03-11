import { GET_BOOKS, ISSUE_BOOK } from '../actions/types'

const isEmpty = require('is-empty')

const initialState = {
  books: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: [...action.payload],
      }

    case ISSUE_BOOK:
      const oldstate = { ...state.books }

      const newstate = oldstate.books.filter((book) => {
        console.log(book._id != action.payload._id)
        return book._id != action.payload._id
      })
      console.log(newstate)
      return {
        ...state,
        books: newstate,
      }

    default:
      return state
  }
}
