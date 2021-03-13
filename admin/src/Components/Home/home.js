import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Nav, FormControl, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = (props) => {
  const [books, setbooks] = useState([])
  const [show, setshow] = useState(false)
  const [book, setBook] = useState({
    title: '',
    author: '',
    type: '',
    ISBN: '',
    _id: '',
  })

  const [search, setSearch] = useState('')

  const handleClose = () => {
    setshow(false)
  }
  useEffect(() => {
    fetch('http://localhost:5000/api/book/get')
      .then((res) => res.json())
      .then((data) => {
        setbooks(data.books)
        console.log('hello')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const deleteBookHandler = async (id) => {
    const res = await fetch(`http://localhost:5000/api/book/${id}`, {
      method: 'delete',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })

    const updatedbooks = [...books]
    const newbooks = updatedbooks.filter((book) => {
      return book._id !== id
    })
    setbooks(() => newbooks)
  }

  const editBookHandler = async (id) => {
    const Index = books.findIndex((b) => {
      return b._id === id
    })
    console.log(id, Index)

    const newbook = books[Index]
    setBook(() => {
      return {
        _id: id,
        title: newbook.title,
        author: newbook.author,
        type: newbook.type,
        ISBN: newbook.ISBN,
      }
    })
  }

  const saveChanges = async () => {
    if (book.title && book.author && book.type && book.ISBN) {
      console.log(book._id)
      const res = await fetch(`http://localhost:5000/api/book/${book._id}`, {
        method: 'put',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      })
      const Index = books.findIndex((b) => {
        return b._id === book._id
      })
      const updatedbooks = [...books]
      updatedbooks[Index] = book

      setbooks(() => updatedbooks)
      console.log(updatedbooks)
    }
    setBook({ title: '', author: '', type: '', ISBN: '', id: '' })
  }

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
          <Link
            to='/issuebook'
            style={{
              marginTop: 5,
              color: 'white',
              textDecoration: 'none',
              fontSize: 20,
            }}
          >
            UserList
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
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Type</th>
            <th>ISBN Number</th>
          </tr>
        </thead>

        <tbody>
          {books
            .filter((book) => {
              if (search == '') {
                return book
              } else if (
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
              ) {
                return book
              }
            })
            .map((book, index) => {
              return (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.type}</td>
                  <td>{book.ISBN}</td>
                  <td>
                    <div>
                      <FaEdit
                        style={{ cursor: 'pointer' }}
                        color='#1607a3'
                        onClick={() => {
                          setshow(true)

                          editBookHandler(book._id)
                        }}
                      />
                      <div style={{ marginRight: 10, display: 'inline' }}></div>

                      <MdDelete
                        style={{ cursor: 'pointer' }}
                        color='#ad0202'
                        onClick={() => {
                          deleteBookHandler(book._id)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>

      <div
        style={{ marginLeft: 20 }}
        onClick={() => {
          props.history.push('addbook')
        }}
      >
        <Button style={{ marginRight: 15 }} variant='success'>
          Add new Book
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setBook({ ...book, title: e.target.value })
                }}
                type='text'
                placeholder='Enter title'
                required
                value={book.title}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setBook({ ...book, author: e.target.value })
                }}
                type='text'
                placeholder='Author'
                required
                value={book.author}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setBook({ ...book, type: e.target.value })
                }}
                type='text'
                placeholder='Genre'
                required
                value={book.type}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>ISBN No.</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setBook({ ...book, ISBN: e.target.value })
                }}
                type='number'
                placeholder='ISBN No.'
                required
                value={book.ISBN}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              handleClose()
              setBook({ title: '', author: '', type: '', ISBN: '', id: '' })
            }}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={async () => {
              await saveChanges()
              setshow(false)
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home
