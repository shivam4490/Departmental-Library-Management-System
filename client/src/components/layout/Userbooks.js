import React, { useState, useEffect } from 'react'
import {
  Card,
  Img,
  Button,
  Nav,
  Navbar,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap'
import art from '../../assets/image/art-of-possible.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userbook } from '../../actions/bookActions'
import pagination from './../Pagination'

const Userbooks = (props) => {
  const onLogout = (e) => {
    e.preventDefault()
    props.logoutUser()
  }

  const books = useSelector((state) => state.books.userbooks)
  console.log(books)

  const dispatch = useDispatch()
  useEffect(async () => {
    await dispatch(userbook())
  }, [])

  const [showPerPage, setShowPerPage] = useState(4)

  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  })

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end })
  }

  const [search, setSearch] = useState('')
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Link
          to='/dashboard'
          style={{
            marginLeft: 40,
            marginRight: 20,

            color: 'white',
            textDecoration: 'none',
            fontSize: 25,
          }}
        >
          Library
        </Link>
        <Nav className='mr-auto'>
          <Link
            to='/mybooks'
            style={{
              marginTop: 10,
              color: 'white',
              textDecoration: 'none',
              fontSize: 15,
            }}
          >
            Issued Books
          </Link>

          <Form inline>
            <FormControl
              type='text'
              placeholder='Search...'
              className='mr-sm-2'
              style={{ marginLeft: 15, width: 250 }}
              onChange={(event) => {
                setSearch(event.target.value)
              }}
            />
            <Button variant='outline-light'>Search</Button>
          </Form>
        </Nav>
        <button
          onClick={onLogout}
          className='btn  btn-light hoverable font-weight-bold'
        >
          Logout
        </button>
      </Navbar>
      <Row>
        {' '}
        {books
          ? books
              .slice(pagination.start, pagination.end)
              .filter((book) => {
                if (search == '') {
                  return book
                } else if (
                  book.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return book
                }
              })
              .map((book) => {
                return (
                  <Card
                    key={book._id}
                    className='my-3 p-3 rounded'
                    style={{ width: '18rem', marginLeft: 80 }}
                  >
                    <Card.Body>
                      <Card.Img
                        variant='top'
                        src={art}
                        style={{ height: 250 }}
                      />
                      <Card.Title style={{ marginTop: 20 }}>
                        {book.title}
                      </Card.Title>
                      <Card.Text>{book.author}</Card.Text>
                      <Card.Text>{book.type}</Card.Text>
                      <Card.Text>{book.ISBN}</Card.Text>
                      <Button variant='danger'>Return Book</Button>
                    </Card.Body>
                  </Card>
                )
              })
          : console.log('shhhh')}
      </Row>
    </div>
  )
}

export default Userbooks
