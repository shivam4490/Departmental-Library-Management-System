import React, { useEffect, useState } from 'react'
import { Button, Table, Nav, Navbar, FormControl, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const IssueBooks = (props) => {
  const [books, setbooks] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    fetch('http://localhost:5000/api/book/getissuedbooks')
      .then((res) => res.json())
      .then((data) => {
        setbooks(data.books)
        console.log('hello')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Link
          to='/'
          style={{
            marginLeft: 40,
            marginRight: 20,

            color: 'white',
            textDecoration: 'none',
            fontSize: 25,
          }}
        >
          AdminSide
        </Link>
        <Nav className='mr-auto'>
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
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>BookName</th>
            <th>username</th>
          </tr>
        </thead>

        <tbody>
          {books
            .filter((book) => {
              if (search == '') {
                return book
              } else if (
                book.username.toLowerCase().includes(search.toLowerCase())
              ) {
                return book
              }
            })
            .map((book, index) => {
              return (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.username}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>

      <div>
        <Button
          style={{ marginLeft: 10 }}
          variant='success'
          onClick={() => {
            props.history.push('/')
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default IssueBooks
