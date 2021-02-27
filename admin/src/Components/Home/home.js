import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const Home = (props) => {
  useEffect(() => {
    fetch("http://localhost:5000/api/book/get")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "hello");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Auther</th>
            <th>Type</th>
            <th>ISBN Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>The song of ice and fire</td>
            <td>George R. R. Martin</td>
            <td>Fantasy</td>
            <td>9781422131008</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Manual for Living</td>
            <td>Epictetus</td>
            <td>Comedy</td>
            <td>9781548372828</td>
          </tr>
        </tbody>
      </Table>

      <div
        style={{ marginLeft: 20 }}
        onClick={() => {
          props.history.push("addbook");
        }}
      >
        <Button variant="success">Add new Book</Button>
      </div>
    </div>
  );
};

export default Home;
