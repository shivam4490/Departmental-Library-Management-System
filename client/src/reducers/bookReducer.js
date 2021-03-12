import { GET_BOOKS, ISSUE_BOOK, USER_BOOK } from '../actions/types'

const isEmpty = require('is-empty')

const initialState = {
  books: [],
  userbooks: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: [...action.payload],
      }

    case ISSUE_BOOK:
      const oldstate = [...state.books]
      let mybook

      const newstate = oldstate.filter((book) => {
        if (book._id == action.payload._id) {
          mybook = book
        }
        return book._id != action.payload._id
      })

      return {
        ...state,
        books: newstate,
        userbooks: state.userbooks.push(mybook),
      }

    case USER_BOOK:
      return {
        ...state,
        userbooks: [...action.payload],
      }

    default:
      return state
  }
}
