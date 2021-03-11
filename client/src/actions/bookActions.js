import axios from 'axios'
import setAuthToken from '../util/setAuthToken'
import { GET_BOOKS, GET_ERRORS, ISSUE_BOOK } from './types'

export const setbooks = () => (dispatch) => {
  axios
    .get('http://localhost:5000/api/book/getavailablebooks')
    .then((res) => {
      dispatch({
        type: GET_BOOKS,
        payload: res.data.books,
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    )
}

export const issuebook = (book) => (dispatch, getState) => {
  const { auth } = getState()

  const newbook = { ...book, userId: auth.user.id }
  axios
    .put(`http://localhost:5000/api/book/issue/${book._id}`, newbook)
    .then((res) => {
      dispatch({
        type: ISSUE_BOOK,
        payload: res.data.books,
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    )
}
