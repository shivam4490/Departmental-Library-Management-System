import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'

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
          <Navbar.Brand href='#home'>Library</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='#features'>Issued Books</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
            <Form inline>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
              />
              <Button variant='outline-light'>Search</Button>
            </Form>
          </Nav>
          <button
            onClick={this.onLogout}
            className='btn btn-large btn-light hoverable font-weight-bold'
          >
            Logout
          </button>
        </Navbar>
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
