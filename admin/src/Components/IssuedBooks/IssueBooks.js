import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

const IssueBooks = (props) => {
  const [books, setbooks] = useState([])
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>BookName</th>
            <th>username</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => {
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
