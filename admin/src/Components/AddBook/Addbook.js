import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Addbook = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    ISBN: "",
  });
  const [isAdded, setIsAdded] = useState(false);

  const addBookHandler = () => {
    if (book.title && book.author && book.genre && book.ISBN) {
      setIsAdded(true);
      setBook({
        title: "",
        author: "",
        genre: "",
        ISBN: "",
      });
      console.log(book);
    }
  };

  return (
    <div style={{ margin: 20 }}>
      {isAdded ? (
        <Alert variant="success">
          Book has been added. {"  "}
          <Alert.Link
            onClick={() => {
              props.history.push("/");
            }}
          >
            Back to home page
          </Alert.Link>
        </Alert>
      ) : (
        ""
      )}

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => {
              setBook({ ...book, title: e.target.value });
            }}
            type="text"
            placeholder="Enter title"
            required
            value={book.title}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Author</Form.Label>
          <Form.Control
            onChange={(e) => {
              setBook({ ...book, author: e.target.value });
            }}
            type="text"
            placeholder="Author"
            required
            value={book.author}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            onChange={(e) => {
              setBook({ ...book, genre: e.target.value });
            }}
            type="text"
            placeholder="Genre"
            required
            value={book.genre}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>ISBN No.</Form.Label>
          <Form.Control
            onChange={(e) => {
              setBook({ ...book, ISBN: e.target.value });
            }}
            type="number"
            placeholder="ISBN No."
            required
            value={book.ISBN}
          />
        </Form.Group>
        <Button
          onClick={addBookHandler}
          variant={
            book.title && book.author && book.genre && book.ISBN
              ? "success"
              : "light"
          }
        >
          Add
        </Button>
        <Button
          style={{ marginLeft: 30 }}
          onClick={() => {
            props.history.push("/");
          }}
          variant="danger"
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default Addbook;
