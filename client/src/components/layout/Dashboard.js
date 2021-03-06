import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Card,
  Row,
  Col,
} from 'react-bootstrap'

import { setbooks, issuebook } from '../../actions/bookActions'
import Pagination from './../Pagination'
import { Link } from 'react-router-dom'

const Dashboard = (props) => {
  const onLogout = (e) => {
    e.preventDefault()
    props.logoutUser()
  }

  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const issuebookHandler = async (book) => {
    await dispatch(issuebook(book))
  }

  useEffect(() => {
    const fun = async () => {
      await dispatch(setbooks())
    }
    fun()
  }, [])

  const books = useSelector((state) => state.books)

  let bookArray = books.books
  console.log(bookArray)

  const { user } = props.auth

  const [showPerPage, setShowPerPage] = useState(4)

  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  })

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end })
  }

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
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
        {bookArray
          ? bookArray
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
                        src={`../../../../${book.Image}`}
                        style={{ height: 250 }}
                      />
                      <Row style={{ marginTop: 10, marginBottom: -10 }}>
                        <Col>
                          <strong>Title: </strong>
                        </Col>
                        <Col>
                          <Card.Text>{book.title}</Card.Text>
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
                        variant='success'
                        style={{ marginTop: 10 }}
                        onClick={() => {
                          issuebookHandler(book)
                        }}
                      >
                        Issue Book
                      </Button>
                    </Card.Body>
                  </Card>
                )
              })
          : console.log('shhhh')}
      </Row>
      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={bookArray.length}
      />
    </div>
  )
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Dashboard)
