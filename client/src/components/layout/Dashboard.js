import React, { Component, useEffect } from 'react'
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
} from 'react-bootstrap'
import manual from '../../assets/image/manual-for-living.jpg'
import art from '../../assets/image/art-of-possible.jpg'
import stumbling from '../../assets/image/stumbling.jpg'
import richestman from '../../assets/image/richest-man.jpg'
import happy from '../../assets/image/happier.jpg'
import book1 from '../../assets/image/book1.jpg'
import { setbooks } from '../../actions/bookActions'

const Dashboard = (props) => {
  const onLogout = (e) => {
    e.preventDefault()
    props.logoutUser()
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const fun = async () => {
      await dispatch(setbooks())
    }
    fun()
  }, [])

  const books = useSelector((state) => state.books)
  let bookArray = []
  bookArray = books.books.books

  const { user } = props.auth
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home' style={{ marginLeft: 40 }}>
          Library
        </Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='#IssuedBooks'>Issued Books</Nav.Link>

          <Form inline>
            <FormControl
              type='text'
              placeholder='Search...'
              className='mr-sm-2'
              style={{ marginLeft: 15, width: 250 }}
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
          ? bookArray.map((book) => {
              return (
                <Card
                  key={book._id}
                  className='my-3 p-3 rounded'
                  style={{ width: '18rem', marginLeft: 80 }}
                >
                  <Card.Body>
                    <Card.Img variant='top' src={art} style={{ height: 250 }} />
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author}</Card.Text>
                    <Card.Text>{book.type}</Card.Text>
                    <Card.Text>{book.ISBN}</Card.Text>
                    <Button variant='secondary'>Issue Book</Button>
                  </Card.Body>
                </Card>
              )
            })
          : console.log('you shut the fuck up ')}
      </Row>
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
