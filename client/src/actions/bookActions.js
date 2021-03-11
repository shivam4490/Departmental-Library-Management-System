import axios from 'axios'
import setAuthToken from '../util/setAuthToken'
import { GET_BOOKS, GET_ERRORS } from './types'

export const setbooks = () => (dispatch) => {
  axios
    .get('http://localhost:5000/api/book/getavailablebooks')
    .then((res) => {
      dispatch({
        type: GET_BOOKS,
        payload: res.data,
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    )
}
