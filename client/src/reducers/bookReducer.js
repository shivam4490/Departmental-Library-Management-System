import { GET_BOOKS, ISSUE_BOOK, USER_BOOK, RETURN_BOOK } from '../actions/types'

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

    case RETURN_BOOK:
      const oldstate1 = [...state.userbooks]
      console.log(oldstate1, action.payload._id)
      let mybook1
      const newstate1 = oldstate1.filter((book) => {
        if (book._id === action.payload._id) {
          mybook1 = book
          return false
        } else {
          return true
        }
      })
      console.log(newstate1)
      return {
        ...state,
        books: state.books.push(mybook1),
        userbooks: newstate1,
      }

    default:
      return state
  }
}
