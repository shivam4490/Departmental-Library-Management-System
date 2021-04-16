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
  Col,
} from 'react-bootstrap'
import art from '../../assets/image/art-of-possible.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { returnbook, userbook } from '../../actions/bookActions'
import Pagination from './../Pagination'

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

  const returnBookHandler = async (book) => {
    await dispatch(returnbook(book))
  }

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
        {books && books.length
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
                        src={`../../../${book.Image}`}
                        style={{ height: 250 }}
                      />
                      <Row style={{ marginTop: 10, marginBottom: -10 }}>
                        <Col>
                          <strong>Title: </strong>
                        </Col>
                        <Col>
                          <Card.Title>{book.title}</Card.Title>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col>
                          <strong>Author: </strong>
                        </Col>
                        <Col>
                          <Card.Text>{book.author}</Card.Text>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col>
                          <strong>Type: </strong>
                        </Col>
                        <Col>
                          <Card.Text>{book.type}</Card.Text>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col>
                          <strong>ISBN: </strong>
                        </Col>
                        <Col>
                          <Card.Text>{book.ISBN}</Card.Text>
                        </Col>
                      </Row>

                      <Button
                        style={{ marginTop: 10 }}
                        variant='danger'
                        onClick={() => {
                          returnBookHandler(book)
                        }}
                      >
                        Return Book
                      </Button>
                    </Card.Body>
                  </Card>
                )
              })
          : console.log('shhhh')}
      </Row>
      {/* <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={books.length}
      /> */}
    </div>
  )
}

export default Userbooks
