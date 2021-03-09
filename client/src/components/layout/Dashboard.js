import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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

class Dashboard extends Component {
  onLogout = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { user } = this.props.auth
    return (
      <div>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href='#home' style={{ marginLeft: 40 }}>
            Library
          </Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='#features'>Issued Books</Nav.Link>

            <Form inline>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
                style={{ marginLeft: 15 }}
              />
              <Button variant='outline-light'>Search</Button>
            </Form>
          </Nav>
          <button
            onClick={this.onLogout}
            className='btn  btn-light hoverable font-weight-bold'
          >
            Logout
          </button>
        </Navbar>
        <Row>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img variant='top' src={art} style={{ height: 250 }} />
              <Card.Title>The Art of Possibility</Card.Title>
              <Card.Text>Rosamund Zander and Benjamin Zander</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9781422131008</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img variant='top' src={manual} style={{ height: 250 }} />
              <Card.Title>Manual for Living</Card.Title>
              <Card.Text>Epictetus</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9781548372828</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img variant='top' src={stumbling} style={{ height: 250 }} />
              <Card.Title>Stumbling on Happiness</Card.Title>
              <Card.Text>Dan Gilbert</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9780007183128</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img
                variant='top'
                src={richestman}
                style={{ height: 250 }}
              />
              <Card.Title>The Richest Man in Babylon</Card.Title>
              <Card.Text>George S. Clason</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9783035020502</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img variant='top' src={happy} style={{ height: 250 }} />
              <Card.Title>10% Happier</Card.Title>
              <Card.Text>Dan Harris</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9780062265425</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img variant='top' src={book1} style={{ height: 250 }} />
              <Card.Title>Manual for Living</Card.Title>
              <Card.Text>Epictetus</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9781548372828</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img variant='top' src={book1} style={{ height: 250 }} />
              <Card.Title>Manual for Living</Card.Title>
              <Card.Text>Epictetus</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9781548372828</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
          <Card
            className='my-3 p-3 rounded'
            style={{ width: '18rem', marginLeft: 80 }}
          >
            <Card.Body>
              <Card.Img variant='top' src={book1} style={{ height: 250 }} />
              <Card.Title>Manual for Living</Card.Title>
              <Card.Text>Epictetus</Card.Text>
              <Card.Text>Self-help</Card.Text>
              <Card.Text>9781548372828</Card.Text>
              <Button variant='secondary'>Issue Book</Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Dashboard)
