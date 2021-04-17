import axios from 'axios'
import setAuthToken from '../util/setAuthToken'
import {
  GET_BOOKS,
  GET_ERRORS,
  ISSUE_BOOK,
  USER_BOOK,
  RETURN_BOOK,
} from './types'

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

  const newbook = {
    ...book,
    userId: auth.user.id,
    issueDate: new Date(),
    returnDate: new Date(
      Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 20
    ),
  }
  axios
    .put(`http://localhost:5000/api/book/issue/${book._id}`, newbook)
    .then((res) => {
      console.log(res.ok)
      dispatch({
        type: ISSUE_BOOK,
        payload: res.data.books,
      })
      console.log(res.data.books)
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    )
}

export const userbook = (book) => (dispatch, getState) => {
  const { auth } = getState()

  axios
    .get(`http://localhost:5000/api/book/getuserbooks`)
    .then((res) => {
      dispatch({
        type: USER_BOOK,
        payload: res.data.books,
      })
      console.log(res.data.books)
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    )
}

export const returnbook = (book) => (dispatch, getState) => {
  axios
    .put(`http://localhost:5000/api/book/return`, book)
    .then((res) => {
      dispatch({
        type: RETURN_BOOK,
        payload: res.data.books,
      })
      console.log(res.data.books)
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    )
}
